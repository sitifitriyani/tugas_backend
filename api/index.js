import express from "express";
import { connection } from "../db.js";

const app = express();
app.use(express.json());

// Hello world
app.get("/api/v1", async (_req, res) => {
  res.send("Hello world!");
});

// Get all students
app.get("/api/v1/students", async (_req, res) => {
  const result = await connection.query("SELECT * FROM students");
  res.json(result);
});

// Add student
app.post("/api/v1/students", async (req, res) => {
  await connection.execute(
    "INSERT INTO students (id, name, generation, present) VALUES (?, ?, ?, ?)",
    [ null,req.body.name, req.body.generation, false]
  );
  res.send("Mahasiswa berhasil disimpan.");
});

// Get student by ID
app.get("/api/v1/students/:id", async (req, res) => {
  const result = await connection.query(
    "SELECT * FROM students WHERE id = ?",
    [req.params.id]
  );
  res.json(result[0]);
});

// Edit student by ID
app.put("/api/v1/students/:id", async (req, res) => {
  await connection.execute(
    "UPDATE students SET name = ?, generation = ?, present = ? WHERE id = ?",
    [req.body.name, req.body.generation, req.body.present, req.params.id]
  );
  res.send("Mahasiswa berhasil diedit.");
});

// Delete student by ID
app.delete("/api/v1/students/:id", async (req, res) => {
  await connection.execute(
    "DELETE FROM students WHERE id = ?", 
    [req.params.id]
    );
  res.send("Mahasiswa berhasil dihapus.");
});

app.listen(3000, () => console.log("Server berhasil dijalankan."));
