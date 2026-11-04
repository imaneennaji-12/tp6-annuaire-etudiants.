// TODO : configurez le routeur (routes : '/' -> StudentListView,
// '/etudiant/:id' -> StudentDetailView, catch-all -> NotFoundView).
import { createRouter, createWebHistory } from "vue-router";
import StudentListView from "../views/StudentListView.vue";
import StudentDetailView from "../views/StudentDetailView.vue";
import NotFoundView from "../views/NotFoundView.vue"; // si le fichier existe déjà

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: StudentListView },
    { path: "/etudiant/:id", component: StudentDetailView },
    { path: "/:pathMatch(.*)*", component: NotFoundView },
  ],
});

export default router;
