# Links dos Jogos

Pagina com links de jogos educativos para criancas da turma de informatica da Casa da Paz. O script le os links do arquivo `jogos.txt`, busca o titulo de cada pagina automaticamente e gera o `index.html` com cards estilizados.

Adicione links de jogos ao `jogos.txt`, um por linha.

## Requisitos

- [Bun](https://bun.sh)

## Instalar dependencias

```bash
bun install
```

## Como usar

```bash
bun run gerar_html.ts
```

Ou pelo script configurado:

```bash
bun run generate
```

## Validar TypeScript

```bash
bun run build
```

Isso gera o `index.html` a partir dos jogos listados em `jogos.txt`.
