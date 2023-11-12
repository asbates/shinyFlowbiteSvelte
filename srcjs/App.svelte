<script>
    import "Shiny"
    import {RadioButton, ButtonGroup, Radio} from 'flowbite-svelte'
    import IrisTable from "./IrisTable.svelte"
    import MtcarsTable from "./MtcarsTable.svelte";
    let radioGroup = "iris"
    $: Shiny.setInputValue('dataset', radioGroup)
</script>


<div>
<ButtonGroup>
    <RadioButton value={"iris"} bind:group={radioGroup}>iris</RadioButton>
    <RadioButton value={"mtcars"} bind:group={radioGroup}>mtcars</RadioButton>
</ButtonGroup>
{#if radioGroup == "iris"}
    <IrisTable></IrisTable>
    {:else}
    <MtcarsTable></MtcarsTable>
{/if}
</div>

