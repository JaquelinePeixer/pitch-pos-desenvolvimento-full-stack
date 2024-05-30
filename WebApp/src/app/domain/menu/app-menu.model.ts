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
        routerLink: '/renovacao'
    }

    public static readonly menuObrasEmprestadas: AppMenuItem = {
        label: 'menu.obraEmprestada',
        routerLink: '/obra-emprestada'
    }

    public static readonly menuEmprestimo: AppMenuItem = {
        label: 'menu.emprestimo',
        routerLink: '/emprestimo'
    }

    public static readonly menuPerfilUsuario: AppMenuItem = {
        label: 'menu.perfilUsuario',
        routerLink: '/perfil-usuario'
    }

    public static readonly menuUsuario: AppMenuItem = {
        label: 'menu.usuario',
        routerLink: '/usuario'
    }

    public static readonly menuLocalizacao: AppMenuItem = {
        label: 'menu.localizacao',
        routerLink: '/localizacao'
    }

    public static readonly menuAssunto: AppMenuItem = {
        label: 'menu.assunto',
        routerLink: '/assunto'
    }

    public static readonly menuObra: AppMenuItem = {
        label: 'menu.obra',
        routerLink: '/obra'
    }

    public static readonly menuAutor: AppMenuItem = {
        label: 'menu.autor',
        routerLink: '/autor'
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
            AppMenuModel.menuObrasEmprestadas,
            AppMenuModel.menuPerfilUsuario
        ]
    }
}