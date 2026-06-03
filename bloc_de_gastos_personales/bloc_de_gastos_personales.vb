Imports System
Imports System.Collections.Generic
Module Bloc_de_gastos_personales
    Dim montos As New List(Of Double)
    Dim categorias As New List(Of String)
    Dim descripciones As New List(Of String)
    Dim fechas As New List(Of String)
    '----------------------------------------------'
    '--|menu_principal_bloc_de_gastos_personales|--'
    '----------------------------------------------'
    Sub MostrarMenu()
        Console.WriteLine("")
        Console.WriteLine("======================================")
        Console.WriteLine("     BLOC DE GASTOS PERSONALES")
        Console.WriteLine("======================================")
        Console.WriteLine(" 1. Agregar gasto")
        Console.WriteLine(" 2. Ver todos los gastos")
        Console.WriteLine(" 3. Ver total gastado")
        Console.WriteLine(" 4. Ver gastos por categoria")
        Console.WriteLine(" 5. Eliminar un gasto")
        Console.WriteLine(" 6. Ver resumen del mes")
        Console.WriteLine(" 7. Salir")
        Console.WriteLine("======================================")
    End Sub
    '-------------------'
    '--|agregar_gasto|--'
    '-------------------'
    Sub AgregarGasto(presupuesto As Double)
        If montos.Count >= 100 Then
            Console.WriteLine("Limite de 100 gastos alcanzado.")
            Return
        End If
        Dim numero As Integer = montos.Count + 1
        Console.WriteLine("-- Agregar Gasto #" & numero & " --")
        Console.Write("Monto ($): ")
        Dim monto As Double = Convert.ToDouble(Console.ReadLine())
        Console.Write("Categoria (Comida/Transporte/Salud/Ocio/Otro): ")
        Dim categoria As String = Console.ReadLine()
        Console.Write("Descripcion: ")
        Dim descripcion As String = Console.ReadLine()
        Console.Write("Fecha (DD/MM/AAAA): ")
        Dim fecha As String = Console.ReadLine()
        montos.Add(monto)
        categorias.Add(categoria)
        descripciones.Add(descripcion)
        fechas.Add(fecha)
        Console.WriteLine("Gasto registrado correctamente.")
        Dim total As Double = 0
        For Each m As Double In montos
            total += m
        Next
        If total > presupuesto Then
            Console.WriteLine($"ALERTA: Has superado tu presupuesto de ${presupuesto:F2}")
            Console.WriteLine($"Total gastado hasta ahora: ${total:F2}")
        End If
    End Sub
    '--------------------------'
    '--|ver_todos_los_gastos|--'
    '--------------------------'
    Sub VerTodosLosGastos()
        If montos.Count = 0 Then
            Console.WriteLine("No hay gastos registrados.")
            Return
        End If
        Console.WriteLine("")
        Console.WriteLine("N  | Fecha       | Categoria   | Monto      | Descripcion")
        Console.WriteLine("-------------------------------------------------------------")

        For i As Integer = 0 To montos.Count - 1
            Console.WriteLine($"{i + 1,-3}| {fechas(i),-12}| {categorias(i),-12}| ${montos(i),-9:F2}| {descripciones(i)}")
        Next
    End Sub
    '-----------------------'
    '--|ver_total_gastado|--'
    '-----------------------'
    Sub VerTotalGastado(presupuesto As Double)
        If montos.Count = 0 Then
            Console.WriteLine("No hay gastos registrados.")
            Return
        End If

        Dim total As Double = 0
        For Each m As Double In montos
            total += m
        Next
        Dim disponible As Double = presupuesto - total
        Console.WriteLine("")
        Console.WriteLine($"Total gastado:     ${total:F2}")
        Console.WriteLine($"Presupuesto:       ${presupuesto:F2}")
        If disponible >= 0 Then
            Console.WriteLine($"Saldo disponible:  ${disponible:F2}")
        Else
            Console.WriteLine($"Exceso:            ${Math.Abs(disponible):F2}")
        End If
    End Sub
    '------------------------------'
    '--|ver_gastos_por_categoria|--'
    '------------------------------'
    Sub VerGastosPorCategoria()
        If montos.Count = 0 Then
            Console.WriteLine("No hay gastos registrados.")
            Return
        End If
        Console.Write("Categoria a buscar: ")
        Dim catBuscar As String = Console.ReadLine()
        Dim encontrados As Integer = 0
        Dim totalCat As Double = 0
        Console.WriteLine($"{vbCrLf}--- Gastos en: {catBuscar} ---")
        For i As Integer = 0 To montos.Count - 1
            If String.Compare(categorias(i), catBuscar, True) = 0 Then
                Console.WriteLine($"{i + 1} | {fechas(i)} | ${montos(i):F2} | {descripciones(i)}")
                totalCat += montos(i)
                encontrados += 1
            End If
        Next
        If encontrados = 0 Then
            Console.WriteLine("No se encontraron gastos en esa categoria.")
        Else
            Console.WriteLine($"Cantidad: {encontrados}")
            Console.WriteLine($"Total:    ${totalCat:F2}")
        End If
    End Sub
    '-----------------------'
    '--|eliminar_un_gasto|--'
    '-----------------------'
    Sub EliminarGasto()
        If montos.Count = 0 Then
            Console.WriteLine("No hay gastos para eliminar.")
            Return
        End If
        Console.Write($"Numero del gasto a eliminar (1 a {montos.Count}): ")
        Dim num As Integer = Convert.ToInt32(Console.ReadLine())
        If num < 1 Or num > montos.Count Then
            Console.WriteLine("Numero invalido.")
            Return
        End If
        Dim indice As Integer = num - 1
        Console.WriteLine($"Eliminado: ${montos(indice):F2} - {descripciones(indice)}")
        montos.RemoveAt(indice)
        categorias.RemoveAt(indice)
        descripciones.RemoveAt(indice)
        fechas.RemoveAt(indice)
        Console.WriteLine("Gasto eliminado correctamente.")
    End Sub
    '-------------------------'
    '--|ver_resumen_del_mes|--'
    '-------------------------'
    Sub VerResumenDelMes(presupuesto As Double)
        If montos.Count = 0 Then
            Console.WriteLine("No hay gastos registrados.")
            Return
        End If
        Dim total As Double = 0
        Dim mayor As Double = montos(0)
        Dim menor As Double = montos(0)
        For Each m As Double In montos
            total += m
            If m > mayor Then mayor = m
            If m < menor Then menor = m
        Next
        Dim promedio As Double = total / montos.Count
        Console.WriteLine("")
        Console.WriteLine("======= RESUMEN DEL MES =======")
        Console.WriteLine($"Gastos registrados: {montos.Count}")
        Console.WriteLine($"Total gastado:      ${total:F2}")
        Console.WriteLine($"Presupuesto:        ${presupuesto:F2}")
        Console.WriteLine($"Gasto mayor:        ${mayor:F2}")
        Console.WriteLine($"Gasto menor:        ${menor:F2}")
        Console.WriteLine($"Promedio por gasto: ${promedio:F2}")
        Console.WriteLine($"{vbCrLf}--- Cantidad por categoria ---")
        Dim conteo As New Dictionary(Of String, Integer)
        For Each cat As String In categorias
            If conteo.ContainsKey(cat) Then
                conteo(cat) += 1
            Else
                conteo(cat) = 1
            End If
        Next
        For Each entrada As KeyValuePair(Of String, Integer) In conteo
            Console.WriteLine($"{entrada.Key}: {entrada.Value} gasto(s)")
        Next
        Console.WriteLine("================================")
    End Sub
    Sub Main(args As String())
        Console.WriteLine("Bienvenido al Bloc de Gastos Personales")
        Console.Write("Define tu presupuesto mensual ($): ")
        Dim presupuesto As Double = Convert.ToDouble(Console.ReadLine())
        Dim opcion As String = ""
        Do
            MostrarMenu()
            Console.Write("Elige una opcion: ")
            opcion = Console.ReadLine()
            Select Case opcion
                Case "1"
                    AgregarGasto(presupuesto)
                Case "2"
                    VerTodosLosGastos()
                Case "3"
                    VerTotalGastado(presupuesto)
                Case "4"
                    VerGastosPorCategoria()
                Case "5"
                    EliminarGasto()
                Case "6"
                    VerResumenDelMes(presupuesto)
                '------------------------------'
                '--|salir_del_menu_principal|--'
                '------------------------------'
                Case "7"
                    Console.WriteLine("Hasta luego. Cuida tus finanzas!")
                Case Else
                    Console.WriteLine("Opcion invalida. Intenta de nuevo.")
            End Select
        Loop While opcion <> "7"
    End Sub
End Module