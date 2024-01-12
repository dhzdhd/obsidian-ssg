<script lang="ts">
    import Tree from "@components/ui/tree.svelte"
    import {type TreeItem} from "@components/ui/tree.svelte"
    import { setContext } from 'svelte';
    import { createTreeView } from '@melt-ui/svelte';

    const ctx = createTreeView({
        defaultExpanded: ['lib-0', 'tree-0'],
    });
    setContext('tree', ctx);

    const {
        elements: { tree },
    } = ctx;

    export let treeItems: TreeItem[];


</script>

<ul class="flex-shrink-0 fixed w-[300px] h-svh top-14 border-[1px] py-3 px-3 list-none" {...$tree} >
    <Tree
        treeItems={treeItems}
    />
</ul>
