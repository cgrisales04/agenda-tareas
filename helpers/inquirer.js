const { green } = require('colors');
const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.green}. Crear tarea`
            },
            {
                value: '2',
                name: `${'2'.green}. Listar tareas`
            },
            {
                value: '3',
                name: `${'3'.green}. Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.green}. Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.green}. Completetar tarea(s)`
            },
            {
                value: '6',
                name: `${'6'.green}. Borrar tareas`
            },
            {
                value: '0',
                name: `${'0'.green}. Salir`
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('============================'.green);
    console.log('   Seleccione una opcion'.green);
    console.log('============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {
    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `Presiones ${'enter'.green} para continuar`
        }
    ];
    await inquirer.prompt(pregunta);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc
}

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map(({ desc, id }, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: id,
            name: `${idx} ${desc}`
        };
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map(({ desc, id, completadoEn }, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: id,
            name: `${idx} ${desc}`,
            checked: (completadoEn) ? true : false
        };
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}