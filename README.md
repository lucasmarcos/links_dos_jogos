# Links dos Jogos

Pagina com links de jogos educativos para criancas da turma de informatica da Casa da Paz. O script le os links do arquivo `jogos.txt`, busca o titulo de cada pagina automaticamente e gera o `index.html` com cards estilizados.

Adicione links de jogos ao `jogos.txt`, um por linha.

### Formato

```
url                         → título e favicon automáticos
url|favicon                 → favicon manual
url||title                  → título manual
url|favicon|title           → ambos manual
```

## Requisitos

- [Bun](https://bun.sh)

## Instalar dependencias

```bash
bun install
```

## Como usar

```bash
bun run generate
```

```bash
bun run buildcss
```

## Validar TypeScript

```bash
bun run typecheck
```

## Executar Biome

```bash
bun run lint
```

Isso gera o `index.html` a partir dos jogos listados em `jogos.txt`.
