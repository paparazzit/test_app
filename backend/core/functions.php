<?php 
// START session
function isLogged(){
    if(isset($_SESSION['userId'])){
        return true;
    } else{
        return false;
    }
}
// REGISTER USER
function registerUser($name, $email, $password){
    global $pdo;
    if($email){
    $stmt= $pdo->prepare("SELECT * FROM  users WHERE email =?");
    $stmt ->execute([$email]);
    $totalUsers = $stmt->rowCount();
    // echo $totalUsers;
        if($totalUsers> 0){
            echo "email taken";
            
        }else{
        $stmt = $pdo -> prepare("INSERT INTO users (name, email, password) VALUES(?, ?, ?)");
        $stmt -> execute([$name, $email, $password]);
        echo trim("success");
        }
}    
}

// LOGIN USER
function loginUser($email, $password){
    
    global $pdo;
    
    $stmt = $pdo ->prepare("SELECT * FROM users WHERE email =?");
    $stmt->execute([$email]);
    $user = $stmt ->fetch();
    $totalUsers = $stmt->rowCount();
    if($totalUsers>0){  
    if(isset($user)){
        if(password_verify($password, $user->password)){
            $_SESSION['userId'] = $user->id;
            $_SESSION['userRole']= $user ->role;
        
        echo json_encode( $user);
        
        
        }else{
           echo json_encode('Wrong Email pass combination');
        
    }
    }
}
    else{
        echo json_encode("We don't have your user");
    }
    
    }




function getAllUsers(){
    global $pdo;
    
    $stmt = $pdo ->prepare("SELECT * FROM users");
	$stmt ->execute();
	$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $users;
}

function getSingle($id){
    global $pdo;
    $stmt = $pdo ->prepare("SELECT * FROM users WHERE id = ?");
	$stmt ->execute([$id]);
	$users = $stmt->fetch();
    return $users;
}
function getUserBySession(){
    global $pdo;
    $id = $_SESSION['userId'];
    $stmt= $pdo->prepare("SELECT * FROM  users WHERE id =?");
    $stmt ->execute([$id]);
    $user =$stmt ->fetch();
    return $user;
}
function getByName( $user, $name){
    global $pdo;
    
    $stmt = $pdo ->prepare("SELECT * FROM users WHERE name = ?");
	$stmt ->execute([ $user]);
	$users = $stmt->fetchAll(PDO::FETCH_ASSOC);;
    return $users;
}

function deleteUser($id){
    global $pdo;
    $stmt = $pdo ->prepare("DELETE  FROM users WHERE id = ?");
	$stmt ->execute([$id]);
	return true;
    
}
function editUser($id, $name, $email, $role){
    global $pdo;
    $stmt = $pdo->prepare("UPDATE users SET name=?, email=?, role=? WHERE id= ?");
    $stmt ->execute([$name, $email, $role, $id]);
    return true;
    
}
function changeName($id, $name){
    global $pdo;
    $stmt = $pdo->prepare("UPDATE users SET name=?, edited_at = NOW() WHERE id= ?");
    $stmt ->execute([$name, $id]);
    return true;
}
function changeEmail($id, $email){
    global $pdo;
    $stmt = $pdo->prepare("UPDATE users SET email=?, edited_at = NOW() WHERE id= ?");
    $stmt ->execute([$email, $id]);
    return true;
}
function changeRole($id, $role){
    global $pdo;
    $stmt = $pdo->prepare("UPDATE users SET role=?, edited_at = NOW() WHERE id= ?");
    $stmt ->execute([$role, $id]);
    return true;
}

// CHANGE PASSOWRD

function changePassword($id, $oldPass, $password){
    global $pdo;
    $stmt = $pdo ->prepare("SELECT * FROM users WHERE id = ?");
    $stmt -> execute([$id]);
    $user = $stmt ->fetch();
    if(!password_verify($oldPass, $user->password)){
       return false;
    }else{
        $newPass_hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt= $pdo ->prepare("UPDATE users SET password =?, edited_at= NOW() WHERE id=?");
        $stmt ->execute([$newPass_hash, $id]);
        return true;
    }
}

function get_percentage($total, $number)
{
  if ( $total > 0 ) {
   return round(($number * 100) / $total, 2);
  } else {
    return 0;
  }
}
function message($percentage){
    if($percentage<50){
        return "Not so good";
    }if($percentage>50 && $percentage < 70){
        return "Good enough";
    }if($percentage>70 && $percentage < 90){
        return "Well done";
    }if($percentage>90){
        return "EXCELLENT ";
    }
}
function dd($data){
    echo '<pre>';
    var_dump($data);
    echo '</pre>';
}
?>