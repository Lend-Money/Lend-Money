create database lendmoney;
use lendmoney;

CREATE TABLE Solicitador(
CPF_Solicitador VARCHAR(11) PRIMARY KEY,
EnderecoSolicitador VARCHAR(100) NOT NULL,
NomeSolicitador VARCHAR(120) NOT NULL,
email VARCHAR(50) NOT NULL,
senha integer NOT NULL,
ocupacao VARCHAR(80),
foto longblob
);

CREATE TABLE Emprestador(
CPF_Emprestador VARCHAR(11) PRIMARY KEY,
NomeEmprestador VARCHAR(120) NOT NULL,
EnderecoEmprestador VARCHAR(100) NOT NULL,
email VARCHAR(50) NOT NULL,
senha integer NOT NULL
);

CREATE TABLE Emprestimo_solicitado(
Id_EmprestimoSolicitado INTEGER auto_increment PRIMARY KEY,
CPF_Solicitador VARCHAR(11) NOT NULL,
Valor FLOAT NOT NULL,
DataMAX_Devolucao DATE NOT NULL,
DataDaSolicitacao DATE NOT NULL,
CONSTRAINT fk_cpfSolicitador FOREIGN KEY (CPF_Solicitador) REFERENCES Solicitador(CPF_Solicitador)
);

CREATE TABLE Emprestimo (
Id_Emprestimo INTEGER auto_increment PRIMARY KEY,
CPF_Emprestador VARCHAR(11) NOT NULL,
Id_EmprestimoSolicitado INTEGER NOT NULL,
CONSTRAINT fk_Solicitado FOREIGN KEY (Id_EmprestimoSolicitado) REFERENCES Emprestimo_solicitado (Id_EmprestimoSolicitado),
CONSTRAINT fk_cpfEmprestador FOREIGN KEY (CPF_Emprestador) REFERENCES Emprestador (CPF_Emprestador)
);

DROP TABLE Emprestador;