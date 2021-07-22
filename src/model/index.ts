/* 系统用户表model */
export interface sysUser {
	id?: string;
	sysname?: string;
	syspwd?: string;
	roleid?: number;
	gtmCreate?: string;
	gtmModify?: string;
	version?: number;
	deleted?: number;
}
