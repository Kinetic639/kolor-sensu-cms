import { create } from "zustand";

export const categoryStore = create<{
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
	selected: "All" | string;
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
	setSelected: (selected: "All" | string) => void;
	reset: () => void;
}>((set) => ({
	selected: "All",
	setSelected: (selected) =>
		set((state) => ({
			selected: state.selected === selected ? "All" : selected,
		})),
	reset: () => set({ selected: "All" }),
}));
