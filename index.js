"use strict";
// Створіть класи Circle, Rectangle, Square і Triangle. 
// У кожного з них є загальнодоступний метод calculateArea. 
// У кожної фігури є загальнодоступні властивості - колір і назва, які не можна змінювати після створення. 
// У Square і Rectangle зі свого боку є ще додатковий метод print, який виводить рядок із формулою розрахунку площі
//абстрактный класс всех фигур
class GeometricFigures {
    color;
    name;
    constructor(color, name) {
        this.color = color;
        this.name = name;
    }
}
//абстрактный класс для Rectangle и Square с реализацией print() (используя ISquareRectanglePrint)
class SquareRectanglePrint extends GeometricFigures {
    print() {
        return `Formula - ${this.printArea}`;
    }
}
class Circle extends GeometricFigures {
    calculateArea = (radius) => Math.PI * radius ** 2;
}
class Triangle extends GeometricFigures {
    calculateArea = (baseOrBaseA, heightOrBaseB, baseC) => {
        if (baseC) {
            const s = (baseOrBaseA + heightOrBaseB + baseC) / 2;
            return Math.sqrt(s * (s - baseOrBaseA) * (s - heightOrBaseB) * (s - baseC));
        }
        else
            return (baseOrBaseA * heightOrBaseB) / 2;
    };
}
class Rectangle extends SquareRectanglePrint {
    printArea = 'S = a * b';
    calculateArea = (sideA, sideB) => sideA * sideB;
}
class Square extends SquareRectanglePrint {
    printArea = 'S = a**2';
    calculateArea = (side) => side ** 2;
}
