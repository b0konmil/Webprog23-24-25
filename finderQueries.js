import Sequelize, { or } from "sequelize";
const { DataTypes, Op } = Sequelize;

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

Student.sync({ alter: true })
	.then(() => {
		return Student.name({
			where: { 
               [Op.or]: {favorite_class: "Computer Science" , has_language_examination: true }},
			raw: true,
		});

	})
	.then((data) => {
		const { count, rows } = data;
		console.log(count);
    console.log(rows);
	})
	.catch((err) => {
		console.log(`Error: ${err.message}`);
	});

Student.sync({ alter: true })
.then(() => {
    return Student.findAll({
        attributes: [
            "name",
            [sequelize.fn("SUM", sequelize.col("name")), "num_students"],
        ],
        group: "school_year",
    });
})
.then((data) => {
    data.forEach((element) => {
        console.log(element.toJSON());
    });
})
.catch((err) => {
    console.log(`Error: ${err.message}`);
});