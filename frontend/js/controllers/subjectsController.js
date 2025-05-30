/**
*    File        : frontend/js/controllers/subjectsController.js
*    Project     : CRUD PHP
*    Author      : Tecnologías Informáticas B - Facultad de Ingeniería - UNMdP
*    License     : http://www.gnu.org/licenses/gpl.txt  GNU GPL 3.0
*    Date        : Mayo 2025
*    Status      : Prototype
*    Iteration   : 3.0 ( prototype )
*/

import { subjectsAPI } from '../api/subjectsAPI.js';

document.addEventListener('DOMContentLoaded', () => 
{
    loadSubjects();
    setupSubjectFormHandler();
    setupCancelHandler();
});

function setupSubjectFormHandler() 
{
  const form = document.getElementById('subjectForm');
  form.addEventListener('submit', async e => 
  {
        e.preventDefault();
        const subject = 
        {
            id: document.getElementById('subjectId').value.trim(),
            name: document.getElementById('name').value.trim()
        };

        try 
        {
            if (subject.id) 
            {
                await subjectsAPI.update(subject);
            }
            else
            {
                await subjectsAPI.create(subject);
            }
            
            form.reset();
            document.getElementById('subjectId').value = '';
            loadSubjects();
        }
        catch (err)
        {
            console.error(err.message);
        }
  });
}

function setupCancelHandler()
{
    const cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.addEventListener('click', () => 
    {
        document.getElementById('subjectId').value = '';
    });
}

async function loadSubjects()
{
    try
    {
        const subjects = await subjectsAPI.fetchAll();
        renderSubjectTable(subjects);
    }
    catch (err)
    {
        console.error('Error cargando materias:', err.message);
    }
}

function renderSubjectTable(subjects)
{
    const tbody = document.getElementById('subjectTableBody');
    tbody.replaceChildren();

    subjects.forEach(subject =>
    {
        const tr = document.createElement('tr');

        tr.appendChild(createCell(subject.name));
        tr.appendChild(createSubjectActionsCell(subject));

        tbody.appendChild(tr);
    });
}

function createCell(text)
{
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}

function createSubjectActionsCell(subject)
{
    const td = document.createElement('td');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'w3-button w3-blue w3-small';
    editBtn.addEventListener('click', () => 
    {
        document.getElementById('subjectId').value = subject.id;
        document.getElementById('name').value = subject.name;
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Borrar';
    deleteBtn.className = 'w3-button w3-red w3-small w3-margin-left';
    deleteBtn.addEventListener('click', () => confirmDeleteSubject(subject.id));

    td.appendChild(editBtn);
    td.appendChild(deleteBtn);
    return td;
}

async function confirmDeleteSubject(id)
{
    if (!confirm('¿Seguro que deseas borrar esta materia?')) return;

    /*try
    {
        await subjectsAPI.remove(id);
        loadSubjects();
    }
    catch (err)
    {
        console.error('Error al borrar materia:', err.message);
    }*/

        try {
            const mensaje = document.getElementById('mensaje');
            
            if (subject.id) {
                await subjectsAPI.update(subject);
                mensaje.textContent = 'Materia actualizada correctamente';
                mensaje.className = 'w3-center w3-text-green w3-padding';
            } else {
                await subjectsAPI.create(subject);
                mensaje.textContent = 'Materia creada correctamente';
                mensaje.className = 'w3-center w3-text-green w3-padding';
            }
        
            form.reset();
            document.getElementById('subjectId').value = '';
            loadSubjects();
        } catch (err) {
            const mensaje = document.getElementById('mensaje');
            mensaje.textContent = err.message || 'Error al procesar la materia';
            mensaje.className = 'w3-center w3-text-red w3-padding';
            console.error(err);
        }
        
}


// lo siguiente lo hizo el gpt xd:

document.getElementById("subjectForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const mensaje = document.getElementById("mensaje");
  
    fetch("localhost/api/subjectsAPI.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then(async (response) => {
        const data = await response.json();
  
        if (!response.ok) {
          mensaje.textContent = data.error || "Error al agregar la materia.";
          mensaje.classList.remove("w3-text-green");
          mensaje.classList.add("w3-text-red");
        } else {
          mensaje.textContent = data.message || "Materia agregada correctamente.";
          mensaje.classList.remove("w3-text-red");
          mensaje.classList.add("w3-text-green");
  
          document.getElementById("subjectForm").reset();
          // Llamá aquí a la función que recarga la tabla si la tenés (ej: cargarMaterias())
        }
      })
      .catch(() => {
        mensaje.textContent = "La materia ya existe.";
        mensaje.classList.remove("w3-text-green");
        mensaje.classList.add("w3-text-blue");
      });
  });
  