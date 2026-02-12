package com.project.calculator;

import com.project.calculator.service.CalculatorEngine;
import com.project.calculator.exception.InvalidExpressionException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        CalculatorEngine engine = new CalculatorEngine();

        System.out.println("=== PRO CALCULATOR ===");
        System.out.println("Type 'exit' to stop.");

        while (true) {
            System.out.print("\nCalculate > ");
            String input = scanner.nextLine().trim();

            if (input.equalsIgnoreCase("exit")) break;
            if (input.isEmpty()) continue;

            try {
                System.out.println("Result: " + engine.evaluate(input));
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
        scanner.close();
    }
}