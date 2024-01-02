# No of lines

To get the number of svelte and js used in the project, use the following command : 
```shell
find . \( -name "*.js" -or -name "*.svelte" \) -not -path "./node_modules/*" -not -path "./.vercel/*" -not -path "./.svelte-kit/*" -not -path "./coverage/*" -type f -exec cat {} + | wc -l
```

# TODO

- [x] Footer
- [x] Url healing
