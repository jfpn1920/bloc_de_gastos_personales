import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
public class Bloc_de_gastos_personales {
    static ArrayList<Double> montos = new ArrayList<>();
    static ArrayList<String> categorias = new ArrayList<>();
    static ArrayList<String> descripciones = new ArrayList<>();
    static ArrayList<String> fechas = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);
    //----------------------------------------------//
    //--|menu_principal_bloc_de_gastos_personales|--//
    //----------------------------------------------//
    static void mostrarMenu() {
        System.out.println();
        System.out.println("======================================");
        System.out.println("     BLOC DE GASTOS PERSONALES");
        System.out.println("======================================");
        System.out.println(" 1. Agregar gasto");
        System.out.println(" 2. Ver todos los gastos");
        System.out.println(" 3. Ver total gastado");
        System.out.println(" 4. Ver gastos por categoria");
        System.out.println(" 5. Eliminar un gasto");
        System.out.println(" 6. Ver resumen del mes");
        System.out.println(" 7. Salir");
        System.out.println("======================================");
    }
    //-------------------//
    //--|agregar_gasto|--//
    //-------------------//
    static void agregarGasto(double presupuesto) {
        if (montos.size() >= 100) {
            System.out.println("Limite de 100 gastos alcanzado.");
            return;
        }
        int numero = montos.size() + 1;
        System.out.println("-- Agregar Gasto #" + numero + " --");
        System.out.print("Monto ($): ");
        double monto = sc.nextDouble();
        sc.nextLine();
        System.out.print("Categoria (Comida/Transporte/Salud/Ocio/Otro): ");
        String categoria = sc.nextLine();
        System.out.print("Descripcion: ");
        String descripcion = sc.nextLine();
        System.out.print("Fecha (DD/MM/AAAA): ");
        String fecha = sc.nextLine();
        montos.add(monto);
        categorias.add(categoria);
        descripciones.add(descripcion);
        fechas.add(fecha);
        System.out.println("Gasto registrado correctamente.");
        double total = montos.stream().mapToDouble(Double::doubleValue).sum();
        if (total > presupuesto) {
            System.out.printf("ALERTA: Has superado tu presupuesto de $%.2f%n", presupuesto);
            System.out.printf("Total gastado hasta ahora: $%.2f%n", total);
        }
    }
    //--------------------------//
    //--|ver_todos_los_gastos|--//
    //--------------------------//
    static void verTodosLosGastos() {
        if (montos.isEmpty()) {
            System.out.println("No hay gastos registrados.");
            return;
        }
        System.out.println();
        System.out.println("N  | Fecha       | Categoria   | Monto      | Descripcion");
        System.out.println("-------------------------------------------------------------");
        for (int i = 0; i < montos.size(); i++) {
            System.out.printf("%-3d| %-12s| %-12s| $%-9.2f| %s%n",
                    i + 1, fechas.get(i), categorias.get(i),
                    montos.get(i), descripciones.get(i));
        }
    }
    //-----------------------//
    //--|ver_total_gastado|--//
    //-----------------------//
    static void verTotalGastado(double presupuesto) {
        if (montos.isEmpty()) {
            System.out.println("No hay gastos registrados.");
            return;
        }
        double total      = montos.stream().mapToDouble(Double::doubleValue).sum();
        double disponible = presupuesto - total;
        System.out.println();
        System.out.printf("Total gastado:     $%.2f%n", total);
        System.out.printf("Presupuesto:       $%.2f%n", presupuesto);
        if (disponible >= 0) {
            System.out.printf("Saldo disponible:  $%.2f%n", disponible);
        } else {
            System.out.printf("Exceso:            $%.2f%n", Math.abs(disponible));
        }
    }
    //------------------------------//
    //--|ver_gastos_por_categoria|--//
    //------------------------------//
    static void verGastosPorCategoria() {
        if (montos.isEmpty()) {
            System.out.println("No hay gastos registrados.");
            return;
        }
        System.out.print("Categoria a buscar: ");
        String catBuscar = sc.nextLine();
        int    encontrados = 0;
        double totalCat    = 0;
        System.out.println("\n--- Gastos en: " + catBuscar + " ---");
        for (int i = 0; i < montos.size(); i++) {
            if (categorias.get(i).equalsIgnoreCase(catBuscar)) {
                System.out.printf("%d | %s | $%.2f | %s%n",
                        i + 1, fechas.get(i), montos.get(i), descripciones.get(i));
                totalCat += montos.get(i);
                encontrados++;
            }
        }
        if (encontrados == 0) {
            System.out.println("No se encontraron gastos en esa categoria.");
        } else {
            System.out.println("Cantidad: " + encontrados);
            System.out.printf("Total:    $%.2f%n", totalCat);
        }
    }
    //-----------------------//
    //--|eliminar_un_gasto|--//
    //-----------------------//
    static void eliminarGasto() {
        if (montos.isEmpty()) {
            System.out.println("No hay gastos para eliminar.");
            return;
        }
        System.out.print("Numero del gasto a eliminar (1 a " + montos.size() + "): ");
        int num = sc.nextInt();
        sc.nextLine();
        if (num < 1 || num > montos.size()) {
            System.out.println("Numero invalido.");
            return;
        }
        int indice = num - 1;
        System.out.printf("Eliminado: $%.2f - %s%n", montos.get(indice), descripciones.get(indice));
        montos.remove(indice);
        categorias.remove(indice);
        descripciones.remove(indice);
        fechas.remove(indice);
        System.out.println("Gasto eliminado correctamente.");
    }
    //-------------------------//
    //--|ver_resumen_del_mes|--//
    //-------------------------//
    static void verResumenDelMes(double presupuesto) {
        if (montos.isEmpty()) {
            System.out.println("No hay gastos registrados.");
            return;
        }
        double total = montos.stream().mapToDouble(Double::doubleValue).sum();
        double mayor = montos.stream().mapToDouble(Double::doubleValue).max().getAsDouble();
        double menor = montos.stream().mapToDouble(Double::doubleValue).min().getAsDouble();
        double promedio = total / montos.size();
        System.out.println();
        System.out.println("======= RESUMEN DEL MES =======");
        System.out.println("Gastos registrados: " + montos.size());
        System.out.printf("Total gastado:      $%.2f%n", total);
        System.out.printf("Presupuesto:        $%.2f%n", presupuesto);
        System.out.printf("Gasto mayor:        $%.2f%n", mayor);
        System.out.printf("Gasto menor:        $%.2f%n", menor);
        System.out.printf("Promedio por gasto: $%.2f%n", promedio);
        System.out.println("\n--- Cantidad por categoria ---");
        Map<String, Integer> conteo = new HashMap<>();
        for (String cat : categorias) {
            conteo.put(cat, conteo.getOrDefault(cat, 0) + 1);
        }
        for (Map.Entry<String, Integer> entrada : conteo.entrySet()) {
            System.out.println(entrada.getKey() + ": " + entrada.getValue() + " gasto(s)");
        }
        System.out.println("================================");
    }
    public static void main(String[] args) {
        System.out.println("Bienvenido al Bloc de Gastos Personales");
        System.out.print("Define tu presupuesto mensual ($): ");
        double presupuesto = sc.nextDouble();
        sc.nextLine();
        while (true) {
            mostrarMenu();
            System.out.print("Elige una opcion: ");
            String opcion = sc.nextLine();
            switch (opcion) {
                case "1":
                    agregarGasto(presupuesto);
                    break;
                case "2":
                    verTodosLosGastos();
                    break;
                case "3":
                    verTotalGastado(presupuesto);
                    break;
                case "4":
                    verGastosPorCategoria();
                    break;
                case "5":
                    eliminarGasto();
                    break;
                case "6":
                    verResumenDelMes(presupuesto);
                    break;
                //------------------------------//
                //--|salir_del_menu_principal|--//
                //------------------------------//
                case "7":
                    System.out.println("Hasta luego. Cuida tus finanzas!");
                    sc.close();
                    return;
                default:
                    System.out.println("Opcion invalida. Intenta de nuevo.");
                    break;
            }
        }
    }
}