const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let actors = [];
let directors = [];

// Route pour les acteurs
app.get('/actors', (req, res) => {
  res.json(actors);
});

app.post('/actors', (req, res) => {
  const actor = req.body;
  actors.push(actor);
  res.status(201).json(actor);
});

app.put('/actors/:id', (req, res) => {
  const id = req.params.id;
  const actor = req.body;
  actors[id] = actor;
  res.json(actor);
});

app.delete('/actors/:id', (req, res) => {
  const id = req.params.id;
  actors.splice(id, 1);
  res.sendStatus(204);
});

// // Route pour les réalisateurs
 app.get('/directors', (req, res) => {
   res.json(directors);
 });
 app.post('/directors', (req, res) => {
   const director = req.body;
   directors.push(director);
   res.status(201).json(director);
 });
 app.put('/directors/:id', (req, res) => {
   const id = req.params.id;
   const director = req.body;
   directors[id] = director;
   res.json(director);
 });
 app.delete('/directors/:id', (req, res) => {
   const id = req.params.id;
   directors.splice(id, 1);
   res.sendStatus(204);
 });

// FIlm 

// // Données de test pour les films
 const films = [];
 // Récupérer la liste des films
 app.get('/films', (req, res) => {
   res.json(films);
 });
 // Créer un nouveau film
 app.post('/films', (req, res) => {
   const { name, description, releaseDate } = req.body;
   if (!name || !description || !releaseDate) {
     return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
   }
   const newFilm = { name, description, releaseDate };
   films.push(newFilm);
   res.status(201).json(newFilm);
 });
 // Modifier un film par son index dans la liste
 app.put('/films/:index', (req, res) => {
   const { index } = req.params;
   if (index >= 0 && index < films.length) {
     const { name, description, releaseDate } = req.body;
     if (name && description && releaseDate) {
       films[index] = { name, description, releaseDate };
       res.json(films[index]);
     } else {
       res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
     }
   } else {
     res.status(404).json({ error: 'Film non trouvé.' });
   }
 });
 // Supprimer un film par son index dans la liste
 app.delete('/films/:index', (req, res) => {
   const { index } = req.params;
   if (index >= 0 && index < films.length) {
     films.splice(index, 1);
     res.json({ message: 'Film supprimé avec succès.' });
   } else {
     res.status(404).json({ error: 'Film non trouvé.' });
   }
 });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
