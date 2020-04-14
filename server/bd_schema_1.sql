-- -----------------------------------------------------
-- Schema food_order
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS "food_order";

-- -----------------------------------------------------
-- Table "food_order"."usuario"
-- -----------------------------------------------------

-- CREATE SEQUENCE "idusuario_seq";

CREATE TABLE IF NOT EXISTS "food_order"."usuario" (
  "idusuario" SERIAL NOT NULL,
  "nome" VARCHAR(64) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(32) NOT NULL,
  PRIMARY KEY ("idusuario"));

-- ALTER SEQUENCE "idusuario_seq" 
-- OWNED BY "food_order"."usuario"."idusuario";

-- -----------------------------------------------------
-- Table "food_order"."categoria"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "food_order"."categoria" (
  "idcategoria" SERIAL NOT NULL,
  "nome" VARCHAR(45) NOT NULL,
  "descricao" TEXT NOT NULL,
  PRIMARY KEY ("idcategoria"));


-- -----------------------------------------------------
-- Table "food_order"."restaurante"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "food_order"."restaurante" (
  "idrestaurante" SERIAL NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "nome" VARCHAR(45) NOT NULL,
  "password" VARCHAR(32) NOT NULL,
  "disponivel" BOOLEAN NOT NULL,
  "categoria_idcategoria" INT NOT NULL,
  PRIMARY KEY ("idrestaurante"),
  CONSTRAINT "fk_restaurante_categoria1"
    FOREIGN KEY ("categoria_idcategoria")
    REFERENCES "food_order"."categoria" ("idcategoria")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX IF NOT EXISTS "fk_restaurante_categoria1_idx" 
    ON "food_order"."restaurante" ("categoria_idcategoria");

-- -----------------------------------------------------
-- Table "food_order"."preco"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "food_order"."preco" (
  "idpreco" SERIAL NOT NULL,
  "valor" FLOAT NOT NULL,
  "create_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("idpreco"));

CREATE UNIQUE INDEX IF NOT EXISTS "update_time_UNIQUE" 
    ON "food_order"."preco" ("create_time");

-- -----------------------------------------------------
-- Table "food_order"."prato"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "food_order"."prato" (
  "idprato" SERIAL NOT NULL,
  "nome" VARCHAR(45) NOT NULL,
  "descricao" TEXT NOT NULL,
  "disponivel" BOOLEAN NOT NULL,
  "restaurante_idrestaurante" INT NOT NULL,
  "preco_idpreco" INT NOT NULL,
  PRIMARY KEY ("idprato"),
  CONSTRAINT "fk_prato_restaurante"
    FOREIGN KEY ("restaurante_idrestaurante")
    REFERENCES "food_order"."restaurante" ("idrestaurante")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "fk_prato_preco1"
    FOREIGN KEY ("preco_idpreco")
    REFERENCES "food_order"."preco" ("idpreco")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX IF NOT EXISTS "fk_prato_restaurante_idx" 
    ON "food_order"."prato" ("restaurante_idrestaurante");
CREATE INDEX IF NOT EXISTS "fk_prato_preco1_idx"
    ON "food_order"."prato" ("preco_idpreco");

-- -----------------------------------------------------
-- Table "food_order"."adicional"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "food_order"."adicional" (
  "idadicional" SERIAL NOT NULL,
  "nome" VARCHAR(45) NOT NULL,
  "descricao" TEXT NOT NULL,
  "preco_idpreco" INT NOT NULL,
  PRIMARY KEY ("idadicional"),
  CONSTRAINT "fk_adicional_preco1"
    FOREIGN KEY ("preco_idpreco")
    REFERENCES "food_order"."preco" ("idpreco")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX IF NOT EXISTS "fk_adicional_preco1_idx" 
    ON "food_order"."adicional" ("preco_idpreco");

-- -----------------------------------------------------
-- Table "food_order"."pedido"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "food_order"."pedido" (
  "idpedido" SERIAL NOT NULL,
  "quantidate" INT NOT NULL,
  "endereco" VARCHAR(45) NOT NULL,
  "adicional_idadicional" INT NOT NULL,
  "prato_idprato" INT NOT NULL,
  "usuario_idusuario" INT NOT NULL,
  PRIMARY KEY ("idpedido"),
  CONSTRAINT "fk_pedido_adicional1"
    FOREIGN KEY ("adicional_idadicional")
    REFERENCES "food_order"."adicional" ("idadicional")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "fk_pedido_prato1"
    FOREIGN KEY ("prato_idprato")
    REFERENCES "food_order"."prato" ("idprato")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "fk_pedido_usuario1"
    FOREIGN KEY ("usuario_idusuario")
    REFERENCES "food_order"."usuario" ("idusuario")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX IF NOT EXISTS "fk_pedido_adicional1_idx" 
    ON "food_order"."pedido" ("adicional_idadicional");
CREATE INDEX IF NOT EXISTS "fk_pedido_prato1_idx" 
    ON "food_order"."pedido" ("prato_idprato");
CREATE INDEX IF NOT EXISTS "fk_pedido_usuario1_idx" 
    ON "food_order"."pedido" 
    ("usuario_idusuario");
