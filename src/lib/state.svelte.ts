function createPersistentState<T>(key: string, initial: T) {
  let parsed = initial;

  const raw = localStorage.getItem(key);
  if (raw !== null) parsed = JSON.parse(raw) as T;

  const value = $state<T>(parsed);

  $effect.root(() => {
    $effect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  });

  return value;
}

export const entries = createPersistentState<Record<string, number>>(
  "entries",
  {},
);

export const palette = createPersistentState<
  { color: string; label: string }[]
>("palette", [
  { color: "#C89442", label: "Great" },
  { color: "#A3C867", label: "Pretty Good" },
  { color: "#75BFD1", label: "Normal" },
  { color: "#A991DD", label: "Not So Great" },
  { color: "#DD88CC", label: "Bad" },
]);

export const year = $state({
  value: new Date().getFullYear(),
});
