/* 系统用户表model */
export interface sysuser {
	id?: string;
	sysname?: string | null;
	syspwd?: string | null;
	roleid?: string | null;
	gtmCreate?: string | null;
	gtmModify?: string | null;
	version?: number | null;
	deleted?: number | null;
}

export interface menu {
	icon: string;
	index: string;
	title: string;
	role: number;
}
