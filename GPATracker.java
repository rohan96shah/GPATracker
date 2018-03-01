/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gpatracker;

import java.util.Scanner;

/**
 *
 * @author Rohan Shah
 */
public class GPATracker 
{
    public enum Grade
    {
        A, B, C, D, P, F, W
    }
    
    Grade g;
    static float cgpa;
    static float possGPA;
    
    
    public GPATracker(Grade userGrade)
    {
        g = userGrade;
    }

    public static void main(String[] args) 
    {
        Grade userGrade;
        Scanner sc = new Scanner(System.in);
        
        char userInp;
        float currentGPA = 0;
        boolean checkGPAentered = false;
        float gpaRequired = 0;
        int numCreditsGpaReq = 0;
        int currGPAcredits = 0;
        int credits;
        int totalCredits = 0;
        float avgScore = 0;
        String menu;
        boolean check = true;
        
        while(check)
        {
            System.out.println("1. Add a class");
            System.out.println("2. Add current GPA");
            System.out.println("3. Calculate CGPA");
            System.out.println("4. Plan for Improvement");
            System.out.println("q. Quit");
            
            menu = sc.next();
            
            switch(menu)
            {  
                case "1":
                            System.out.println("How many credits?");
                            //credits: temp variable
                            credits = sc.nextInt(); //getting no. of credits from user
                        
                            //totalCredits: keeps a track of the total number of credits towards calculating CGPA
                            totalCredits += credits;
                        
                            System.out.println("Grade obtained?");
                            //userGrade: stores the grade obtained by the user
                            userGrade = Grade.valueOf(sc.next().toUpperCase());
                        
                            switch(userGrade)
                            {
                                //avgScore: NR for GPA Calculations
                                
                                case A:
                                        avgScore += 4 * credits;
                                        break;
                                case B:
                                        avgScore += 3 * credits;
                                        break;
                                case C:
                                        avgScore += 2 * credits;
                                        break;
                                case D:
                                        avgScore += 1 * credits;
                                        break;
                                case F:
                                        avgScore += 0;
                                        break;
                                case P:
                                        //do nothing
                                        totalCredits -= credits;
                                        break;
                                default:
                                        System.out.println("Invalid Input");
                                        break;
                            }
                            break;
                            
                case "2":   
                            do
                            {
                                System.out.println("Enter GPA");
                                currentGPA = sc.nextFloat();
                            
                                //Error Handling
                                if((currentGPA > 4) || (currentGPA < 0))
                                {
                                    System.out.println("Invalid Input. Enter your GPA on a 4.0 scale.");
                                    currentGPA = 0;
                                    checkGPAentered = true;
                                }
                                else
                                {
                                    System.out.println("Enter number of credits taken");
                                    currGPAcredits = sc.nextInt();
                                    
                                    totalCredits += currGPAcredits;
                                    checkGPAentered = false;
                                }
                            }while(checkGPAentered);
                            
                            checkGPAentered = false;
                            break;
                            
                            
                case "3":   calcCGPA(currentGPA, currGPAcredits, avgScore, totalCredits);
                            System.out.println("Cumulative GPA: " + cgpa);
                            break;
                            
                case "4":   do
                            {
                                System.out.println("Enter the CGPA required by the end of the semester/academic year or by graduation");
                                gpaRequired = sc.nextFloat();
                                
                                if((gpaRequired > 4) || (gpaRequired < 0))
                                {
                                    System.out.println("Invalid Input. Enter your GPA on a 4.0 scale.");
                                    gpaRequired = 0;
                                    checkGPAentered = true;
                                }
                                else
                                {
                                    checkGPAentered = false;
                                    System.out.println("Enter the number of credits you'll be taking");
                                    numCreditsGpaReq = sc.nextInt();
                                    checkReqCGPA(currentGPA, currGPAcredits, 4, numCreditsGpaReq, avgScore, totalCredits);
                                    //First, we will check if the required GPA is possible to attain or not
                                    //We will do this by assuming that the student gets an A in every class
                                    if(possGPA >= gpaRequired)
                                    {
                                        System.out.println("Congratulations! It is possible to obtain the required CGPA at the completion of the number of credits required");
                                        float minGPA = 0;
                                        //cgpa = (currentGPA * currGPAcredits) + avgScore/totalCredits;
                                        
                                        int tempTotalCredits = totalCredits + numCreditsGpaReq;
                                        float tempGPA;
                                        calcCGPA(currentGPA, currGPAcredits, avgScore, totalCredits);
                                        
                                        tempGPA = ((gpaRequired * tempTotalCredits) - (cgpa * totalCredits))/numCreditsGpaReq;
                                        //minGPA = ((gpaRequired * (totalCredits + numCreditsGpaReq)) - (cgpa * totalCredits))*2/(totalCredits + numCreditsGpaReq);
                                        System.out.println("Minimum GPA that you will have to maintain, for the credits you'll be taking, to obtain the required CGPA: " + tempGPA);
                                    }
                                    else
                                    {
                                        System.out.println("Sorry, based on the data provided it is not possible.");
                                        System.out.println("You can get a minimum GPA " + possGPA + " by maintaining a 4.0 for the credits you'll be taking. You can try reaching your goal by increasing the number of credits");
                                        System.out.println("Want to Try again?");
                                        System.out.println("Y. Yes");
                                        System.out.println("N. No");
                                        
                                        userInp = sc.next().charAt(0);
                                        
                                        if(userInp == 'Y')
                                        {
                                            checkGPAentered = true;
                                        }
                                        else
                                        {
                                            checkGPAentered = false;
                                        }
                                    }
                                    
                                }
                                
                            }while(checkGPAentered);
                            checkGPAentered = false;
                            break;
                            
                case "q": 
                            check = false;
                            break;
                     
                default:    System.out.println("Invalid Input. Try again");
                            break;
            }
        }
    }
    
    
    public static void calcCGPA(float currGPA, int currCredit, float aS, int tc)
    {
        cgpa = ((currGPA * currCredit) + aS)/(tc);
    }
    
    public static void checkReqCGPA(float currGPA, int currCredit, float reqGpa, int reqCred, float aS, int tc)
    {
        possGPA = ((currGPA * currCredit) + (reqGpa * reqCred) + aS)/(tc+reqCred);
    }
    
}
