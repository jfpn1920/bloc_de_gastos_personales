Algoritmo bloc_de_gastos_personales
	Dimension montos[100]
	Dimension categorias[100]
	Dimension descripciones[100]
	Dimension fechas[100]
	contador <- 0
	Escribir "Bienvenido al Bloc de Gastos Personales"
	Escribir "Define tu presupuesto mensual ($): "
	Leer presupuesto
	//----------------------------------------------//
	//--|menu_principal_bloc_de_gastos_personales|--//
	//----------------------------------------------//
	Repetir
		Escribir ""
		Escribir "======================================"
		Escribir "     BLOC DE GASTOS PERSONALES"
		Escribir "======================================"
		Escribir " 1. Agregar gasto"
		Escribir " 2. Ver todos los gastos"
		Escribir " 3. Ver total gastado"
		Escribir " 4. Ver gastos por categoria"
		Escribir " 5. Eliminar un gasto"
		Escribir " 6. Ver resumen del mes"
		Escribir " 7. Salir"
		Escribir "======================================"
		Escribir "Elige una opcion: "
		Leer opcion
		Segun opcion Hacer
			//-------------------//
			//--|agregar_gasto|--//
			//-------------------//
			1:
				Si contador >= 100 Entonces
					Escribir "Limite de 100 gastos alcanzado."
				SiNo
					contador <- contador + 1
					Escribir "-- Agregar Gasto #", contador, " --"
					Escribir "Monto ($): "
					Leer montos[contador]
					Escribir "Categoria (Comida/Transporte/Salud/Ocio/Otro): "
					Leer categorias[contador]
					Escribir "Descripcion: "
					Leer descripciones[contador]
					Escribir "Fecha (DD/MM/AAAA): "
					Leer fechas[contador]
					Escribir "Gasto registrado correctamente."
					total <- 0
					Para i <- 1 Hasta contador Hacer
						total <- total + montos[i]
					FinPara
					Si total > presupuesto Entonces
						Escribir "ALERTA: Has superado tu presupuesto de $", presupuesto
						Escribir "Total gastado hasta ahora: $", total
					FinSi
				FinSi
			//-------------------------//
			//--|ver_todo_los_gastos|--//
			//-------------------------//
			2:
				Si contador = 0 Entonces
					Escribir "No hay gastos registrados."
				SiNo
					Escribir ""
					Escribir "N  | Fecha       | Categoria   | Monto   | Descripcion"
					Escribir "--------------------------------------------------------"
					Para i <- 1 Hasta contador Hacer
						Escribir i, " | ", fechas[i], " | ", categorias[i], " | $", montos[i], " | ", descripciones[i]
					FinPara
				FinSi
			//-----------------------//
			//--|ver_total_gastado|--//
			//-----------------------//
			3:
				Si contador = 0 Entonces
					Escribir "No hay gastos registrados."
				SiNo
					total <- 0
					Para i <- 1 Hasta contador Hacer
						total <- total + montos[i]
					FinPara
					Escribir ""
					Escribir "Total gastado:     $", total
					Escribir "Presupuesto:       $", presupuesto
					disponible <- presupuesto - total
					Si disponible >= 0 Entonces
						Escribir "Saldo disponible:  $", disponible
					SiNo
						Escribir "Exceso:            $", disponible * (-1)
					FinSi
				FinSi
			//------------------------------//
			//--|ver_gastos_por_categoria|--//
			//------------------------------//
			4:
				Si contador = 0 Entonces
					Escribir "No hay gastos registrados."
				SiNo
					Escribir "Categoria a buscar: "
					Leer catBuscar
					encontrados <- 0
					totalCat <- 0
					Escribir ""
					Escribir "--- Gastos en: ", catBuscar, " ---"
					Para i <- 1 Hasta contador Hacer
						Si categorias[i] = catBuscar Entonces
							Escribir i, " | ", fechas[i], " | $", montos[i], " | ", descripciones[i]
							totalCat <- totalCat + montos[i]
							encontrados <- encontrados + 1
						FinSi
					FinPara
					Si encontrados = 0 Entonces
						Escribir "No se encontraron gastos en esa categoria."
					SiNo
						Escribir "Cantidad: ", encontrados
						Escribir "Total:    $", totalCat
					FinSi
				FinSi
				//-----------------------//
				//--|eliminar_un_gasto|--//
				//-----------------------//
			5:
				Si contador = 0 Entonces
					Escribir "No hay gastos para eliminar."
				SiNo
					Escribir "Numero del gasto a eliminar (1 a ", contador, "): "
					Leer num
					Si num < 1 O num > contador Entonces
						Escribir "Numero invalido."
					SiNo
						Escribir "Eliminado: $", montos[num], " - ", descripciones[num]
						Para i <- num Hasta contador - 1 Hacer
							montos[i]        <- montos[i + 1]
							categorias[i]    <- categorias[i + 1]
							descripciones[i] <- descripciones[i + 1]
							fechas[i]        <- fechas[i + 1]
						FinPara
						contador <- contador - 1
						Escribir "Gasto eliminado correctamente."
					FinSi
				FinSi
			//-------------------------//
			//--|ver_resumen_del_mes|--//
			//-------------------------//
			6:
				Si contador = 0 Entonces
					Escribir "No hay gastos registrados."
				SiNo
					total  <- 0
					mayor  <- montos[1]
					menor  <- montos[1]
					Para i <- 1 Hasta contador Hacer
						total <- total + montos[i]
						Si montos[i] > mayor Entonces
							mayor <- montos[i]
						FinSi
						Si montos[i] < menor Entonces
							menor <- montos[i]
						FinSi
					FinPara
					promedio <- total / contador
					Escribir ""
					Escribir "======= RESUMEN DEL MES ======="
					Escribir "Gastos registrados: ", contador
					Escribir "Total gastado:      $", total
					Escribir "Presupuesto:        $", presupuesto
					Escribir "Gasto mayor:        $", mayor
					Escribir "Gasto menor:        $", menor
					Escribir "Promedio por gasto: $", promedio
					Escribir ""
					Escribir "--- Cantidad por categoria ---"
					Dimension listaC[100]
					Dimension contC[100]
					categoriasVistas <- 0
					Para i <- 1 Hasta contador Hacer
						encontrada <- Falso
						Para j <- 1 Hasta categoriasVistas Hacer
							Si listaC[j] = categorias[i] Entonces
								contC[j] <- contC[j] + 1
								encontrada <- Verdadero
							FinSi
						FinPara
						Si NO encontrada Entonces
							categoriasVistas <- categoriasVistas + 1
							listaC[categoriasVistas] <- categorias[i]
							contC[categoriasVistas] <- 1
						FinSi
					FinPara
					Para j <- 1 Hasta categoriasVistas Hacer
						Escribir listaC[j], ": ", contC[j], " gasto(s)"
					FinPara
					Escribir "================================"
				FinSi
			//------------------------------//
			//--|salir_del_menu_principal|--//
			//------------------------------//
			7:
				Escribir "Hasta luego. Cuida tus finanzas!"
			De Otro Modo:
				Escribir "Opcion invalida. Intenta de nuevo."
		FinSegun
	Hasta Que opcion = 0
FinAlgoritmo