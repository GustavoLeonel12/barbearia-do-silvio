<#
upload_to_github.ps1

Usage examples:
.\upload_to_github.ps1 -RepoName "barbearia-do-silvio" -Public
.\upload_to_github.ps1 -RepoName "barbearia-do-silvio" -Owner "meu-usuario" -Public

This script tries to create a GitHub repo and push the current folder.
It prefers the GitHub CLI (`gh`) when available. If `gh` is not present
but an env var `GITHUB_TOKEN` exists, it will call the GitHub REST API.
If neither is available, it prints manual steps.
#>

param(
    [Parameter(Mandatory=$true)][string]$RepoName,
    [string]$Owner = "",
    [switch]$Public
)

function Write-ErrAndExit($msg){
    Write-Host $msg -ForegroundColor Red
    exit 1
}

# Check git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-ErrAndExit "`nGit não está instalado ou não está no PATH. Instale Git e execute novamente: https://git-scm.com/download/win`n"
}

$isPublic = $Public.IsPresent

# Prefer GitHub CLI
if (Get-Command gh -ErrorAction SilentlyContinue) {
    Write-Host "Usando GitHub CLI (gh) para criar repositório e dar push..."
    $repoArg = if ([string]::IsNullOrEmpty($Owner)) { $RepoName } else { "$Owner/$RepoName" }
    $pubArg = if ($isPublic) { "--public" } else { "--private" }
    Write-Host "Executando: gh repo create $repoArg $pubArg --source=. --remote=origin --push --confirm"
    gh repo create $repoArg $pubArg --source=. --remote=origin --push --confirm
    if ($LASTEXITCODE -ne 0) { Write-ErrAndExit "gh falhou ao criar ou pushar o repositório." }
    Write-Host "Repositório criado e push realizado com sucesso."
    exit 0
}

# Fall back to GitHub API if token is present
if ($env:GITHUB_TOKEN) {
    Write-Host "GitHub CLI não encontrado, usando GITHUB_TOKEN para criar repositório via API..."
    $isOrg = -not [string]::IsNullOrEmpty($Owner)
    $uri = if ($isOrg) { "https://api.github.com/orgs/$Owner/repos" } else { "https://api.github.com/user/repos" }
    $body = @{ name = $RepoName; private = (-not $isPublic) } | ConvertTo-Json
    try {
        $resp = Invoke-RestMethod -Method Post -Uri $uri -Headers @{ Authorization = "token $env:GITHUB_TOKEN"; Accept = 'application/vnd.github+json' } -Body $body -ContentType 'application/json'
    } catch {
        Write-ErrAndExit "Falha ao criar repositório via API: $_"
    }
    # Add remote and push
    git remote add origin $resp.ssh_url 2>$null
    if ($LASTEXITCODE -ne 0) { git remote remove origin 2>$null; git remote add origin $resp.ssh_url }
    git branch -M main
    git add .
    git commit -m "Initial commit" 2>$null
    git push -u origin main
    if ($LASTEXITCODE -ne 0) { Write-ErrAndExit "Push falhou." }
    Write-Host "Repositório criado e push realizado com sucesso." -ForegroundColor Green
    exit 0
}

Write-Host "Não foi possível automatizar: nem 'gh' nem 'GITHUB_TOKEN' estão disponíveis." -ForegroundColor Yellow
Write-Host "Siga estes passos manuais:" -ForegroundColor White
Write-Host "1) Crie um repositório no GitHub (https://github.com/new)." -ForegroundColor White
Write-Host "2) No seu terminal execute:" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git remote add origin https://github.com/<seu-usuario>/$RepoName.git" -ForegroundColor Cyan
Write-Host "   git add . && git commit -m 'Initial commit'" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host "Ou instale o GitHub CLI: https://cli.github.com/ e rode: gh repo create $RepoName --public --source=. --remote=origin --push --confirm" -ForegroundColor White
exit 2
