<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>FleX-debug demo</title>

</head>
<body>
    <?php
        /* array test*/
        function newArray($lenght)
        {
            $array;
            for ($i=0; $i < $lenght; $i++)
            {
                $array["item ".($i + 1)." key"] = "item ".($i + 1)." value";
            }
            return $array;
        }
        $a = $b = $c = $d = $e = $f = newArray(5);

        $e["item 1 key"] = $f; $d["item 2 key"] = $e; $c["item 3 key"] = $d; $b["item 4 key"] = $c; $a["item 5 key"] = $b;

        $e[0] = $f; $d[1] = $e; $c[2] = $d; $b[3] = $c; $a[4] = $b;

        ini_set("xdebug.var_display_max_depth",10);
        // var_dump($a);

        /*object test */
        function newObject() // random attributes
        {
            $obj = new stdClass();
            $attributes_values = ["string value", 101, 145.6, true , false, newArray(2), null];
            foreach ($attributes_values as $key => $value)
            {
                $target_key = rand(0, count($attributes_values));
                if ($target_key == count($attributes_values)) //overflow key
                {
                    $obj->{"attr".($key+1)} = newObject();
                }
                else
                {
                    $obj->{"attr".($key+1)} = $attributes_values[$target_key];
                }
            }
            return $obj;
        }
        var_dump(newObject()); // random object
        echo "<hr>";
        var_dump($a); // array

     ?>

     <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

    <script src="flex-debug.js" type="text/javascript"></script>
</body>
</html>
