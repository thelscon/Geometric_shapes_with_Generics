// Створіть класи Circle, Rectangle, Square і Triangle. 
// У кожного з них є загальнодоступний метод calculateArea. 
// У кожної фігури є загальнодоступні властивості - колір і назва, які не можна змінювати після створення. 
// У Square і Rectangle зі свого боку є ще додатковий метод print, який виводить рядок із формулою розрахунку площі

//Circle = Math.PI * r**2 
//Rectangle = a * b
//Square = a ** 2
//Triangle = (baseValue * heightValue) / 2 или s = (a + b + c) / 2 => Math.sqrt( s * (s - a) * (s - b) * (s - c) )

// значения для print()
const enum EPrintAreaValues {
    Rectangle = 'S = a * b' ,
    Square = 'S = a**2'
}
// обобщение при применении этих значений
type printAreaType<Type> = Type extends Rectangle ? EPrintAreaValues.Rectangle
                            : Type extends Square ? EPrintAreaValues.Square
                            : never
                            
// обобщение метода расчета площади для различных фигур
type calculateAreaType<Type> = Type extends (Circle | Square) ? (valueA : number ) => number
                                : Type extends Rectangle ? (valueA : number , valueB : number) => number
                                : Type extends Triangle ? (valueA : number , valueB : number , valueC ?: number) => number
                                : never
            
interface IGeometricFigures<Type> {
    readonly color : string ,
    readonly name : string ,

    calculateArea : calculateAreaType<Type>
}
interface ISquareRectanglePrint {
    print : () => string
}

//абстрактный класс всех фигур
abstract class GeometricFigures <Type> implements IGeometricFigures<Type> {
    constructor (
        public readonly color : string ,
        public readonly name : string
    ) {}

    abstract calculateArea : calculateAreaType<Type>
}

//абстрактный класс для Rectangle и Square с реализацией print() (используя ISquareRectanglePrint)
abstract class SquareRectanglePrint<Type> extends GeometricFigures<Type> implements ISquareRectanglePrint{
    protected abstract printArea : printAreaType<Type>
    
    print () : string {
        return `Formula - ${this.printArea}`
    }
}


class Circle extends GeometricFigures<Circle> {
    calculateArea = (radius : number ) => Math.PI * radius**2
}
class Triangle extends GeometricFigures<Triangle> {
    calculateArea = (baseOrBaseA : number , heightOrBaseB : number , baseC ?: number) => {
        if ( baseC ) {
            const s : number = (baseOrBaseA + heightOrBaseB + baseC) / 2
            return Math.sqrt( s * (s - baseOrBaseA) * (s - heightOrBaseB) * (s - baseC) )
        }
        else {
            return (baseOrBaseA * heightOrBaseB) / 2
        }
    }
}

class Rectangle extends SquareRectanglePrint<Rectangle> {
    protected printArea : printAreaType<Rectangle> = EPrintAreaValues.Rectangle
    
    calculateArea = (sideA : number , sideB : number) => sideA * sideB
}
class Square extends SquareRectanglePrint<Square> {
    protected printArea : printAreaType<Square> = EPrintAreaValues.Square

    calculateArea = (side : number) => side**2
}