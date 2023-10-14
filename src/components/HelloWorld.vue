<template>
  <div>
    <h1>Actors</h1>
    <form @submit.prevent="createActor">
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" v-model="newActor.firstName" required>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" v-model="newActor.lastName" required>
      <label for="birthdate">Birthdate:</label>
      <input type="date" id="birthdate" v-model="newActor.birthdate" required>
      <button type="submit">Create</button>
    </form>
    <ul>
      <h2>Listes des acteurs</h2>
      <li v-for="(actor, index) in actors" :key="index">
        {{ actor.firstName }} {{ actor.lastName }} ({{ actor.birthdate }})
        <button @click="editActor(actor, index)">Edit</button>
        <button @click="deleteActor(index)">Delete</button>
      </li>
    </ul>
  </div>
  <div>
    <h1>Directors</h1>
    <form @submit.prevent="createDirector">
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" v-model="newDirector.firstName" required>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" v-model="newDirector.lastName" required>
      <label for="birthdate">Birthdate:</label>
      <input type="date" id="birthdate" v-model="newDirector.birthdate" required>
      <button type="submit">Create</button>
    </form>
    <ul>
      <h2>Listes des réalisateurs</h2>
      <li v-for="(director, index) in directors" :key="'director-' + index">
        {{ director.firstName }} {{ director.lastName }} ({{ director.birthdate }})
        <button @click="editDirector(director, index)">Edit</button>
        <button @click="deleteDirector(index)">Delete</button>
      </li>
    </ul>
  </div>

  <div>
    <h1>Films</h1>
    <form @submit.prevent="createFilm">
      <label for="filmName">Nom du film:</label>
      <input type="text" id="filmName" v-model="newFilm.name" required>
      <label for="filmDescription">Description:</label>
      <input type="text" id="filmDescription" v-model="newFilm.description" required>
      <label for="filmReleaseDate">Date de parution:</label>
      <input type="date" id="filmReleaseDate" v-model="newFilm.releaseDate" required>
      <button type="submit">Créer</button>
    </form>
    <ul>
      <h2>Listes des films</h2>
      <li v-for="(film, index) in films" :key="index">
        {{ film.name }} - {{ film.description }} ({{ film.releaseDate }})
        <button @click="editFilm(film, index)">Modifier</button>
        <button @click="deleteFilm(index)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  data() {
    return {
      newActor: {
        firstName: '',
        lastName: '',
        birthdate: '',
      },
      actors: [],
      newDirector: {
        firstName: '',
        lastName: '',
        birthdate: '',
      },
      directors: [],

      newFilm: {
        name: '',
        description: '',
        releaseDate: '',
      },
      films: [],
   
    };
  
    
  },
  created() {
    this.fetchActors();
    this.fetchDirectors();
    this.fetchFilms();
  },
  
  methods: {

    // méthodes pour les acteurs //
    async createActor() {
      try {
        const response = await fetch('http://localhost:3000/actors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newActor),
        });

        if (response.ok) {
          const data = await response.json();
          this.actors.push(data);
          // Réinitialisez le formulaire après la création
          this.newActor = { firstName: '', lastName: '', birthdate: '' };
        } else {
          console.error('Erreur lors de la création de l\'acteur');
        }
      } catch (error) {
        console.error('Erreur lors de la création de l\'acteur', error);
      }
    },
    async editActor(actor, index) {
      try {
        const response = await fetch(`http://localhost:3000/actors/${index}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(actor),
        });

        if (response.ok) {
          const data = await response.json();
          this.actors[index] = data;
        } else {
          console.error('Erreur lors de la mise à jour de l\'acteur');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'acteur', error);
      }
    },
    async deleteActor(index) {
  try {
    const response = await fetch(`http://localhost:3000/actors/${index}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      this.actors.splice(index, 1);
    } else {
      console.error('Erreur lors de la suppression de l\'acteur');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'acteur', error);
  }
},
async fetchActors() {
      try {
        const response = await fetch('http://localhost:3000/actors');
        if (response.ok) {
          this.actors = await response.json();
        } else {
          console.error('Erreur lors de la récupération des acteurs');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des acteurs', error);
      }
    },

    
    // méthodes pour les réalisateurs

    async createDirector() {
      try {
        const response = await fetch('http://localhost:3000/directors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newDirector),
        });

        if (response.ok) {
          const data = await response.json();
          this.directors.push(data);
          // Réinitialisez le formulaire après la création
          this.newDirector = { firstName: '', lastName: '', birthdate: '' };
        } else {
          console.error('Erreur lors de la création du réalisateur');
        }
      } catch (error) {
        console.error('Erreur lors de la création du réalisateur', error);
      }
    },
    async editDirector(director, index) {
      try {
        const response = await fetch(`http://localhost:3000/directors/${index}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(director),
        });

        if (response.ok) {
          const data = await response.json();
          this.directors[index] = data;
        } else {
          console.error('Erreur lors de la mise à jour du réalisateur');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du réalisateur', error);
      }
    },
    async deleteDirector(index) {
      try {
        const response = await fetch(`http://localhost:3000/directors/${index}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          this.directors.splice(index, 1);
        } else {
          console.error('Erreur lors de la suppression du réalisateur');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du réalisateur', error);
    }
  },
    async fetchDirectors() {
      try {
        const response = await fetch('http://localhost:3000/directors');
        if (response.ok) {
          this.directors = await response.json();
        } else {
          console.error('Erreur lors de la récupération des réalisateurs');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des réalisateurs', error);
      }
    },


    // méthodes pour les films 
    async createFilm() {
  try {
    if (this.newFilm.description.length > 2048) {
      console.error('La description du film dépasse la limite de 2048 caractères.');
      return;
    }

    const response = await fetch('http://localhost:3000/films', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.newFilm),
    });

    if (response.ok) {
      const data = await response.json();
      this.films.push(data);
      // Réinitialisez le formulaire après la création
      this.newFilm = { name: '', description: '', releaseDate: '' };
    } else {
      console.error('Erreur lors de la création du film');
    }
  } catch (error) {
    console.error('Erreur lors de la création du film', error);
  }
},
    async editFilm(film, index) {
      try {
        const response = await fetch(`http://localhost:3000/films/${index}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(film),
        });

        if (response.ok) {
          const data = await response.json();
          this.films[index] = data;
        } else {
          console.error('Erreur lors de la mise à jour du film');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du film', error);
      }
    },
    async deleteFilm(index) {
      try {
        const response = await fetch(`http://localhost:3000/films/${index}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          this.films.splice(index, 1);
        } else {
          console.error('Erreur lors de la suppression du film');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du film', error);
      }
    },
    async fetchFilms() {
      try {
        const response = await fetch('http://localhost:3000/films');
        if (response.ok) {
          this.films = await response.json();
        } else {
          console.error('Erreur lors de la récupération des films');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des films', error);
      }
    },
  },

  


};
</script>
