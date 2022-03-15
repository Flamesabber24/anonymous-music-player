<script>
  import { createEventDispatcher } from "svelte";

  let searchResult = "";

  const dispatch = createEventDispatcher();

  const onSearchChange = () => {
    dispatch("search", searchResult);
  };

  const onEnterPressed = (e) => {
    if (e.charCode === 13) dispatch("enter", searchResult);
  };
</script>

<input
  class="w-full pl-3 focus:outline-none"
  type="text"
  placeholder="Search..."
  bind:value={searchResult}
  on:input={onSearchChange}
  on:keypress={onEnterPressed}
/>
