class Github {
    constructor(){
        this.clientId="f62faad59e0e99241cdb";
        this.clientSecret="3574f1d3cbb8fefe9c97370cb67d067c7fc5237d";
        this.perPage= 10;
        this.short= "asc"; 
    }
    //* apiden kullanıcı bilgisini alır
    async getUser(username){
        //parametre olarak gelen kullanıcı bilgisine istek atma
        const profileRes = await fetch(
            `https://api.github.com/users/${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`
        );

        // repo bilgilerini alma
            const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=${this.perPage}&sort=${this.short}&client_id=${this.clientId}&client_secret=${this.clientSecret}`)
        // gelen cevabı json a çevirme
        const profile = await profileRes.json();
        const repos = await repoRes.json();
        // fonsiyonun çağırıldığı yere profil ve repo bilgisini gönderme
        return {
            profile,
            repos,
        };
    }
}

export default Github;