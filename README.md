# cambios

Github action to detect if there are any changes in pnpm workspace or repository using pnpm since some point (git ref, git tag or commit-sha) in your git history

Internally uses [pnpm's filtering](https://pnpm.io/filtering) capabilities

## Usage

```yaml
 ....
    steps:
     # setup your node and pnpm
     ....
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Get changed packages
        uses: akshay5995/cambios@v1.0.0
        id: changed-package-action
        with:
          package-name: "" # Optional
          since: "" # Optional defaults to "origin/main"
      - name: echo changed packages
        run: echo ${{ steps.changed-package-action.outputs.changed-packages }}
      - name: echo CHANGE_DETECTED env
        run: echo ${{ env.CHANGE_DETECTED }}
```

## Inputs

Name in your `package.json` for the package that you want to detect change for:

```yaml
    package-name: "" # Optional
```

```yaml
    since: "" # Optional defaults to "origin/main"
```

## Outputs

Environment variable:

```yaml
    CHANGE_DETECTED
```

Can be used in following steps:

```yaml
    steps:
      ....
      - name: Get changed packages
        uses: akshay5995/cambios@v1.0.0
      - name: Run tests if only package has changed
        if: ${{ env.CHANGE_DETECTED }}
        run: pnpm test:ci
```

Output:

```yaml
  changed-packages 
```

Can be used in following steps: (useful in a monorepo that uses [pnpm workspaces](https://pnpm.io/workspaces))

```yaml
    steps:
      ....
      - name: Get changed packages
        uses: akshay5995/cambios@v1.0.0
        id: changed-package-action
      - name: Echo all changed packages in the repo
        run: echo ${{ steps.changed-package-action.outputs.changed-packages }}
```

Outputs stringified Json array for changed packages e.g, "["cambios"]"
