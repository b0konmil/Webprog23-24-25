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
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				len: [4, 20]
			}
		},
		favorite_class: {
			type: DataTypes.STRING(25),
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

Student.sync({ alert: true })
	.then(() => {
		return Student.bulkCreate([
      { student_id: 1, name: "Joe", favorite_class: "Computer Science", school_year: 3, has_language_examination: true },
      { student_id: 2, name: "Jane", favorite_class: "Physical Education", school_year: 2, has_language_examination: false },
      { student_id: 3, name: "Mike", favorite_class: "Maths", school_year: 4, has_language_examination: true },
      { student_id: 4, name: "Maria", favorite_class: "Biology", school_year: 1, has_language_examination: false },
      { student_id: 5, name: "Thomas", favorite_class: "History", school_year: 2, has_language_examination: true },
    ],
  );
	})
	.then((data) => {
		data.forEach((element) => {
      console.log(element.toJSON())
    })
	})
	.catch((err) => {
		console.log(`Error: ${err.message}`);
	});