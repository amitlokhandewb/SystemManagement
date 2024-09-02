export interface Permission {
    id: number;
    permissionId: number;
    parentId: number;
    view: boolean;
    modify: boolean;
    roleId: number;
    pageName: string;
    children: Permission[];
}