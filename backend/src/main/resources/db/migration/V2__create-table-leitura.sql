CREATE TABLE leitura (
    id SERIAL PRIMARY KEY,
    data_inicio TIMESTAMP NOT NULL,
    data_termino TIMESTAMP NOT NULL,
    pagina INT NOT NULL,
	livro_id INT NOT NULL,
	FOREIGN KEY (livro_id) references livro(id) on delete CASCADE
);