<template>
  <h1>Annuaire des étudiants</h1>

  <!-- A : formulaire d'ajout -->
  <form @submit.prevent="ajouterEtudiant">
    <input v-model="newStudent.firstName" placeholder="Prénom" />
    <input v-model="newStudent.lastName" placeholder="Nom" />
    <input v-model="newStudent.filiere" placeholder="Filière" />
    <input
      v-model.number="newStudent.year"
      type="number"
      min="1"
      placeholder="Année"
    />
    <input v-model="newStudent.email" type="email" placeholder="Email" />
    <button type="submit">Ajouter</button>
  </form>

  <!-- B : recherche + tri -->
  <div class="toolbar">
    <input v-model="recherche" placeholder="Rechercher par nom ou prénom" />
    <select v-model="tri">
      <option value="lastName">Trier par nom</option>
      <option value="filiere">Trier par filière</option>
    </select>
  </div>

  <!-- B (suite) : liste -->
  <StudentCard
    v-for="student in etudiantsAffiches"
    :key="student.id"
    :student="student"
  />
</template>

<script>
import StudentCard from "../components/StudentCard.vue";
import { store } from "../store/students.js";

export default {
  name: "StudentListView",
  components: { StudentCard },
  data() {
    return {
      store,
      recherche: "",
      tri: "lastName",
      newStudent: {
        firstName: "",
        lastName: "",
        filiere: "",
        year: 1,
        email: "",
      },
    };
  },
  computed: {
    etudiantsAffiches() {
      const q = this.recherche.toLowerCase();

      // 1) filtrer
      const filtres = this.store.students.filter(
        (s) =>
          s.lastName.toLowerCase().includes(q) ||
          s.firstName.toLowerCase().includes(q),
      );

      // 2) trier (sur une copie)
      return [...filtres].sort((a, b) =>
        a[this.tri].localeCompare(b[this.tri]),
      );
    },
  },
  methods: {
    ajouterEtudiant() {
      // validation : prénom et nom obligatoires
      if (
        !this.newStudent.firstName.trim() ||
        !this.newStudent.lastName.trim()
      ) {
        alert("Le prénom et le nom sont obligatoires");
        return;
      }

      this.store.students.push({
        id: Date.now(), // un nombre, comme les autres id
        firstName: this.newStudent.firstName.trim(),
        lastName: this.newStudent.lastName.trim(),
        filiere: this.newStudent.filiere.trim(),
        year: this.newStudent.year,
        email: this.newStudent.email.trim(),
      });

      // vider le formulaire
      this.newStudent = {
        firstName: "",
        lastName: "",
        filiere: "",
        year: 1,
        email: "",
      };
    },
  },
};
</script>
