const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: './database.sqlite',
    define: {
        timestamps: true,
        freezeTableName: true,
    }
});

//Tabela usuario
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

//Tabela Tarefa com fk de Usuario
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

//Opções adicionais para a tabela usuario
Usuario.hasMany(Tarefa, {
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
})

module.exports = {
    sequelize,
    Usuario,
    Tarefa,
};
