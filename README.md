# Lark Notify - GitHub Action

![Version](./badge.svg)

A [GitHub Action](https://github.com/features/actions) to send a message to a Lark group.


## build

build ncc
```bash
npx tsc
ncc build src/index.ts -o dist
```

make tag
```bash
git add .
git commit -m "Initial TypeScript GitHub Action"
git tag -a v1 -m "Release v1"
git push origin main --tags
```