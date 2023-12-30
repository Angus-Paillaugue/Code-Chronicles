<script>
    let { src, alt, loading } = $props();

    alt = alt || "Image";
    loading = loading || "Image";
</script>

<img {src} {alt} {loading} class="w-full object-cover rounded-lg">