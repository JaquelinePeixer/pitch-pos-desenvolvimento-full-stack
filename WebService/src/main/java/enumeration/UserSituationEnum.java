package enumeration;

public enum UserSituationEnum {

    ACTIVE("Ativo", true),
    INACTIVE("Inativo", false);

    private Boolean value;

    private String description;

    UserSituationEnum(String description, Boolean value){
        this.description = description;
        this.value = value;
    }
}
