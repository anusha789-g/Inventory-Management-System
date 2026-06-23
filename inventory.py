inventory = {}

while True:
    print("\n===== INVENTORY MANAGEMENT SYSTEM =====")
    print("1. Add Product")
    print("2. View Products")
    print("3. Update Quantity")
    print("4. Delete Product")
    print("5. Exit")

    choice = input("Enter choice: ")

    if choice == "1":
        name = input("Product Name: ")
        qty = input("Quantity: ")
        inventory[name] = qty
        print("Product Added Successfully")

    elif choice == "2":
        print(inventory)

    elif choice == "3":
        name = input("Product Name: ")

        if name in inventory:
            qty = input("New Quantity: ")
            inventory[name] = qty
            print("Quantity Updated")
        else:
            print("Product Not Found")

    elif choice == "4":
        name = input("Product Name: ")

        if name in inventory:
            del inventory[name]
            print("Product Deleted")
        else:
            print("Product Not Found")

    elif choice == "5":
        print("Thank You")
        break

    else:
        print("Invalid Choice")