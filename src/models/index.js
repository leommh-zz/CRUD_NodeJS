const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: './database.sqlite',
    define: {
        timestamps: true,
        freezeTableName: true,
    }
});

/*******
 * TODO: Definição dos modelos.
 * Defina aqui os modelos a serem mapeados para entidades do banco de dados.
 *******/
const Usuario = sequelize.define('usuario', {
   id: {
       primaryKey: true,
       type: Sequelize.BIGINT,
       autoIncrement: true
   },
   nome: {
    type: Sequelize.STRING(200),
    allowNull: false
   },
   email:{
       type: Sequelize.STRING(200),
       allowNull: false,
       unique: true
   },
   cpf: {
       type: Sequelize.STRING(14),
       allowNull: false,
       unique: true
   },
   senha: {
       type: Sequelize.BLOB,
       allowNull: false
   },
   nascimento: {
       type: Sequelize.DATEONLY()
   }
});

const Tarefa = sequelize.define('tarefa', {
    id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    titulo: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT
    },
    concluida:{
        type: Sequelize.TINYINT,
        defaultValue: 0
    },
    usuarioId: {
        type: Sequelize.BIGINT,
        references: {
          model: "usuario",
          key: "id"
        }
    }
})

/*******
 * TODO: Definição das relações.
 * Defina aqui os relacionamentos entre os modelos.
 *******/

Usuario.hasMany(Tarefa, {
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
})

module.exports = {
    sequelize,
    Usuario,
    Tarefa,
};
