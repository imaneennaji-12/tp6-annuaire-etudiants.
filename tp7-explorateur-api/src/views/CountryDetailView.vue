<template>
  <p class="loading" v-show="loading">Chargement...</p>
  <p class="error" v-if="error">{{ error }}</p>

  <div v-if="country">
    <img
      :src="country.flags.svg"
      :alt="`Drapeau ${country.name}`"
      style="width: 200px"
    />
    <h1>{{ country.name }}</h1>
    <p>Nom natif : {{ country.nativeName }}</p>
    <p>Capitale : {{ country.capital || "—" }}</p>
    <p>Région : {{ country.region }}</p>
    <p>Population : {{ country.population.toLocaleString() }}</p>
  </div>

  <button @click="$router.back()">Retour</button>
</template>

<script>
const API_URL = "https://countries.dev/countries";

export default {
  name: "CountryDetailView",
  data() {
    return {
      country: null,
      loading: true,
      error: null,
    };
  },
  methods: {
    async chargerPays() {
      this.loading = true;
      this.error = null;
      try {
        const code = this.$route.params.code;
        const reponse = await fetch(API_URL);
        if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`);
        const data = await reponse.json();
        const pays = data.find((p) => p.alpha3Code === code);
        if (!pays) throw new Error("Pays introuvable");
        this.country = pays;
      } catch (e) {
        console.error(e);
        this.error = "Impossible de charger ce pays.";
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.chargerPays();
  },
};
</script>
