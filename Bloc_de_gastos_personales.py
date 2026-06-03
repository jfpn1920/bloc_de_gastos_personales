montos = []
categorias = []
descripciones = []
fechas = []
#----------------------------------------------#
#--|menu_principal_bloc_de_gastos_personales|--#
#----------------------------------------------#
def mostrar_menu():
    print("")
    print("======================================")
    print("     BLOC DE GASTOS PERSONALES")
    print("======================================")
    print(" 1. Agregar gasto")
    print(" 2. Ver todos los gastos")
    print(" 3. Ver total gastado")
    print(" 4. Ver gastos por categoria")
    print(" 5. Eliminar un gasto")
    print(" 6. Ver resumen del mes")
    print(" 7. Salir")
    print("======================================")
#-------------------#
#--|agregar_gasto|--#
#-------------------#
def agregar_gasto(presupuesto):
    if len(montos) >= 100:
        print("Limite de 100 gastos alcanzado.")
        return
    numero = len(montos) + 1
    print(f"-- Agregar Gasto #{numero} --")
    monto = float(input("Monto ($): "))
    categoria = input("Categoria (Comida/Transporte/Salud/Ocio/Otro): ")
    descripcion = input("Descripcion: ")
    fecha = input("Fecha (DD/MM/AAAA): ")
    montos.append(monto)
    categorias.append(categoria)
    descripciones.append(descripcion)
    fechas.append(fecha)
    print("Gasto registrado correctamente.")
    total = sum(montos)
    if total > presupuesto:
        print(f"ALERTA: Has superado tu presupuesto de ${presupuesto:.2f}")
        print(f"Total gastado hasta ahora: ${total:.2f}")
#-------------------------#
#--|ver_todo_los_gastos|--#
#-------------------------#
def ver_todos_los_gastos():
    if len(montos) == 0:
        print("No hay gastos registrados.")
        return
    print("")
    print("N  | Fecha       | Categoria   | Monto      | Descripcion")
    print("-------------------------------------------------------------")
    for i in range(len(montos)):
        print(f"{i+1}  | {fechas[i]}  | {categorias[i]:<12} | ${montos[i]:<9.2f} | {descripciones[i]}")
#-----------------------#
#--|ver_total_gastado|--#
#-----------------------#
def ver_total_gastado(presupuesto):
    if len(montos) == 0:
        print("No hay gastos registrados.")
        return
    total = sum(montos)
    disponible = presupuesto - total
    print("")
    print(f"Total gastado:     ${total:.2f}")
    print(f"Presupuesto:       ${presupuesto:.2f}")
    if disponible >= 0:
        print(f"Saldo disponible:  ${disponible:.2f}")
    else:
        print(f"Exceso:            ${abs(disponible):.2f}")
#------------------------------#
#--|ver_gastos_por_categoria|--#
#------------------------------#
def ver_gastos_por_categoria():
    if len(montos) == 0:
        print("No hay gastos registrados.")
        return
    cat_buscar = input("Categoria a buscar: ")
    encontrados = 0
    total_cat = 0
    print(f"\n--- Gastos en: {cat_buscar} ---")
    for i in range(len(montos)):
        if categorias[i].lower() == cat_buscar.lower():
            print(f"{i+1} | {fechas[i]} | ${montos[i]:.2f} | {descripciones[i]}")
            total_cat += montos[i]
            encontrados += 1
    if encontrados == 0:
        print("No se encontraron gastos en esa categoria.")
    else:
        print(f"Cantidad: {encontrados}")
        print(f"Total:    ${total_cat:.2f}")
#-----------------------#
#--|eliminar_un_gasto|--#
#-----------------------#
def eliminar_gasto():
    if len(montos) == 0:
        print("No hay gastos para eliminar.")
        return
    num = int(input(f"Numero del gasto a eliminar (1 a {len(montos)}): "))
    if num < 1 or num > len(montos):
        print("Numero invalido.")
        return
    indice = num - 1
    print(f"Eliminado: ${montos[indice]:.2f} - {descripciones[indice]}")
    montos.pop(indice)
    categorias.pop(indice)
    descripciones.pop(indice)
    fechas.pop(indice)
    print("Gasto eliminado correctamente.")
#-------------------------#
#--|ver_resumen_del_mes|--#
#-------------------------#
def ver_resumen_del_mes(presupuesto):
    if len(montos) == 0:
        print("No hay gastos registrados.")
        return
    total    = sum(montos)
    mayor    = max(montos)
    menor    = min(montos)
    promedio = total / len(montos)
    print("")
    print("======= RESUMEN DEL MES =======")
    print(f"Gastos registrados: {len(montos)}")
    print(f"Total gastado:      ${total:.2f}")
    print(f"Presupuesto:        ${presupuesto:.2f}")
    print(f"Gasto mayor:        ${mayor:.2f}")
    print(f"Gasto menor:        ${menor:.2f}")
    print(f"Promedio por gasto: ${promedio:.2f}")
    print("\n--- Cantidad por categoria ---")
    conteo = {}
    for cat in categorias:
        conteo[cat] = conteo.get(cat, 0) + 1
    for cat, cantidad in conteo.items():
        print(f"{cat}: {cantidad} gasto(s)")
    print("================================")
print("Bienvenido al Bloc de Gastos Personales")
presupuesto = float(input("Define tu presupuesto mensual ($): "))
while True:
    mostrar_menu()
    opcion = input("Elige una opcion: ")
    if opcion == "1":
        agregar_gasto(presupuesto)
    elif opcion == "2":
        ver_todos_los_gastos()
    elif opcion == "3":
        ver_total_gastado(presupuesto)
    elif opcion == "4":
        ver_gastos_por_categoria()
    elif opcion == "5":
        eliminar_gasto()
    elif opcion == "6":
        ver_resumen_del_mes(presupuesto)
    #------------------------------#
    #--|salir_del_menu_principal|--#
    #------------------------------#
    elif opcion == "7":
        print("Hasta luego. Cuida tus finanzas!")
        break
    else:
        print("Opcion invalida. Intenta de nuevo.")