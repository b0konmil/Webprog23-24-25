import Sequelize from "sequelize";
const { DataTypes } = Sequelize;

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./database.sqlite",
	define: {
		timestamps: false,
	},
});

const Student = sequelize.define(
	"student",
	{
		student_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: VARCHAR(255),
			allowNull: false,
			validate: {
				len: [4, 20]
			}
		},
		favorite_class: {
			type: VARCHAR(25),
            defaultValue: 'Computer Science'
		},
		school_year: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
        has_language_examination: {
            type: DataTypes.TINYINT,
            defaultValue: true
        }
	},
	{
		freezeTableName: true,
	}
);

console.log(sequelize.models.students);

Student.sync()
	.then((data) => {
		console.log("Table and model synced successful");
	})
	.catch((err) => {
		console.log("Error syncing the table and model");
	});
