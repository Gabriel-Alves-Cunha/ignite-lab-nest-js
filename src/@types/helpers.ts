export type Replace<Original, Replacement> = Omit<Original, keyof Replacement> &
	Replacement;
