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
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Get Github version info
        id: meta
        run: |
          echo "version=$(git describe --always --tags --match='v*') (commit=`echo ${GITHUB_SHA} | cut -c1-8`)" >> "$GITHUB_OUTPUT"

      - name: Get commit logs
        id: commit_step
        run: |
          commit_logs=$(git log ${{ github.event.before }}..${{ github.sha }} --pretty=format:"%h(%an) - %s")
          echo "COMMIT_LOGS<<EOF" >> $GITHUB_ENV
          echo "$commit_logs" >> $GITHUB_ENV
          echo "EOF" >> $GITHUB_ENV

      - name: Lark Notification
        uses: kevin-rd/lark-notify@main
        env:
          LARK_WEBHOOK: ${{ secrets.LARK_WEBHOOK }}
        with:
          header_template: "yellow"
          header_content: "Lark Notify Action Demo"
          message_env_tag: "testint"
          message_version: "${{ steps.meta.outputs.version }}"
          message_commit_logs: "${{ env.COMMIT_LOGS }}"
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