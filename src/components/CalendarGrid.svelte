<script lang="ts">
  let year: number = $state(new Date().getFullYear()); // Temporary: will have dedicated select UI later

  let palette: {
    color: string;
    label: string;
  }[] = $state([
    { color: "#C89442", label: "Great" },
    { color: "#A3C867", label: "Pretty Good" },
    { color: "#75BFD1", label: "Normal" },
    { color: "#A991DD", label: "Not So Great" },
    { color: "#DD88CC", label: "Bad" },
  ]); // Temporary: will have dedicated select UI later

  let entries: Record<string, number> = $state({
    "2026-01-01": 0,
    "2026-01-02": 1,
    "2026-01-03": 2,
    "2026-01-04": 3,
    "2026-01-05": 4,
  });

  const months = Array.from({ length: 12 }, (_, i) => i);
  const days = Array.from({ length: 31 }, (_, i) => i);

  let monthLengths = $derived(
    Array.from({ length: 12 }, (_, month) =>
      new Date(year, month + 1, 0).getDate(),
    ), // Day 0 of next month = last day of current month
  );

  function getDateKey(
    year: number,
    monthIndex: number,
    dayIndex: number,
  ): string {
    return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(dayIndex + 1).padStart(2, "0")}`;
  }
</script>

<table class="border-collapse">
  <thead>
    <tr>
      <th></th>
      {#each months as month}
        <th class="text-xs">{month + 1}</th>
      {/each}
    </tr>
  </thead>

  <tbody>
    {#each days as day}
      <tr>
        <th class="pr-1.5 text-xs">{day + 1}</th>
        {#each months as month}
          {#if day < monthLengths[month]}
            <td
              class="h-4 w-4 border-2 sm:h-5 sm:w-5"
              style:background={palette[entries[getDateKey(year, month, day)]]
                ?.color ?? null}
              onclick={() => {
                entries[getDateKey(year, month, day)] = 2; // Temporary: will have separate UI for choosing value later
              }}
            ></td>
          {:else}
            <td></td> <!-- Necessary for table alignment-->
          {/if}
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
