# Lark Notify - GitHub Action

![Version](./badge.svg)

A [GitHub Action](https://github.com/features/actions) to send a message to a Lark group.


## uses

```yaml
on: push
name: Lark Notification Demo
jobs:
  larkNotification:
    name: Lark Notification
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Lark Notification
        uses: kevin-rd/lark-notify@v1.6
        env:
          LARK_WEBHOOK: ${{ secrets.LARK_WEBHOOK }}
        with:
          header_template: 'yellow'
          header_content: 'Greetings from the Lark Notify Action'
          message_env_tag: 'devint'
          message_version: 'v1.0.0'
```



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