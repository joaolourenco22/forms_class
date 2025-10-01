import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function TodoListForm() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      tasks: [
        { text: "Exemplo de tarefa", completed: false }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks"
  });

  const onSubmit = (data) => {
    console.log("Dados enviados:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <h2 style={styles.title}>Lista de Tarefas</h2>

      {fields.map((field, index) => (
        <div key={field.id} style={styles.taskRow}>
          <input
            type="text"
            placeholder="Digite a tarefa..."
            {...register(`tasks.${index}.text`)}
            defaultValue={field.text}
            style={styles.input}
          />

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              {...register(`tasks.${index}.completed`)}
              defaultChecked={field.completed}
            />
            Concluída
          </label>

          <button
            type="button"
            onClick={() => remove(index)}
            style={styles.removeBtn}
          >
            Remover
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ text: "", completed: false })}
        style={styles.addBtn}
      >
        + Adicionar Tarefa
      </button>

      <button type="submit" style={styles.submitBtn}>
        Salvar Lista
      </button>
    </form>
  );
}

// Estilos inline simples só para deixar usável
const styles = {
  form: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    background: "#f9f9f9",
    fontFamily: "sans-serif"
  },
  title: {
    textAlign: "center",
    marginBottom: "15px"
  },
  taskRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    gap: "8px"
  },
  input: {
    flex: 1,
    padding: "5px 8px"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "0.9em"
  },
  removeBtn: {
    background: "#ff6b6b",
    color: "#fff",
    border: "none",
    padding: "5px 8px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  addBtn: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "8px",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  submitBtn: {
    display: "block",
    width: "100%",
    padding: "8px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};
