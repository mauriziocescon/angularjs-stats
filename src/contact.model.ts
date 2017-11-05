export class Contact {
    public id: string;
    public icon: string;
    public desc: string;
    public date: Date;
    public note: string;

    constructor(icon: string, desc: string, note: string) {
        this.id = new Date().getTime().toString();
        this.icon = icon;
        this.desc = desc;
        this.date = new Date();
        this.note = note;
    }
}
