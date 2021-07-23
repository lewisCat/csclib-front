/* 系统用户表model */
export interface sysuser {
	id: string;
	sysname: string;
	syspwd?: string | null;
	roleid: number;
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
