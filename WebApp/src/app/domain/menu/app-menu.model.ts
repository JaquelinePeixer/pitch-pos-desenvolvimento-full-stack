export class AppMenuItem {
    label?: string;
    icon?: string;
    routerLink?: string;
    items?: AppMenuItem[];
    dontNeedPermission?: boolean;
}

export class AppMenuModel {

    public static readonly menuRenovacao: AppMenuItem = {
        label: 'menu.renovacao',
        routerLink: '/intranet/renovacao'
    }

    public static readonly menuObraEmprestada: AppMenuItem = {
        label: 'menu.obra-emprestada',
        routerLink: '/intranet/obra-emprestada'
    }

    public static readonly menuEmprestimo: AppMenuItem = {
        label: 'menu.emprestimo',
        routerLink: '/intranet/emprestimo'
    }

    public static readonly menuPerfilUsuario: AppMenuItem = {
        label: 'menu.perfilUsuario',
        routerLink: '/intranet/perfil-usuario'
    }

    public static readonly menuUsuario: AppMenuItem = {
        label: 'menu.usuario',
        routerLink: '/intranet/usuario'
    }

    public static readonly menuLocalizacao: AppMenuItem = {
        label: 'menu.localizacao',
        routerLink: '/intranet/localizacao'
    }

    public static readonly menuAssunto: AppMenuItem = {
        label: 'menu.assunto',
        routerLink: '/intranet/assunto'
    }

    public static readonly menuObra: AppMenuItem = {
        label: 'menu.obra',
        routerLink: '/intranet/obra'
    }

    public static readonly menuAutor: AppMenuItem = {
        label: 'menu.autor',
        routerLink: '/intranet/autor'
    }

    public static readonly menuIntranet: AppMenuItem = {
        label: '',
        routerLink: '/intranet',
        items: [
            AppMenuModel.menuRenovacao,
            AppMenuModel.menuEmprestimo,
            AppMenuModel.menuObra,
            AppMenuModel.menuUsuario,
            AppMenuModel.menuAutor,
            AppMenuModel.menuAssunto,
            AppMenuModel.menuLocalizacao,
            AppMenuModel.menuObraEmprestada,
            AppMenuModel.menuPerfilUsuario
        ]
    }
}